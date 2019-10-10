import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {UserService} from '../services/user.service';
import {User} from '../shared/models/user.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {PactService} from '../services/pact.service';

import {log} from "util";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    //array for iterating through badges
    Arr = Array; //Array type captured in a variable
    num: number = 8; //number of badges in total that a user can win
    pact;
    user: User;
    fitBitUser;
    fitBitActivity;
    JSON;
    curDate = new Date();
    sevenDaysBefore = this.getDaysBefore(7);
    public graphSleepJson;
    public graphStepsJson;
    public graphCalsJson;
    isLoading = true;


    constructor(private auth: AuthService,
                private userService: UserService,
                private http: HttpClient,
                private pactService: PactService
    ) {
      this.JSON = JSON;
    }

    getHTTPOptions(fitbitData){
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + fitbitData
            })
        };
    }

    ngOnInit() {
        this.getUser();
    }




    getUser() {
        let sevenBeforeFormatted = this.formatDates(this.sevenDaysBefore);

        this.userService.getUser(this.auth.currentUser).subscribe(
            data => {

                //if user has not authenticated then use dummy data
                this.user = data;
                console.log("user is ", data);
                this.num -= Object.keys(this.user.badges).length;

                if(!this.user.fitbit){
                    console.log("no fitbit")
                    this.activitiesPlaceHolder();
                    this.sevenDayStepsPlaceHolder();
                    this.caloriesPlaceHolder();
                    this.sevenDaySleepPlaceHolder();
                    return;
                }

                //get user's pact
                this.pactService.getPact(String(data.pact)).subscribe(
                    data => {
                        this.pact = data;
                        console.log("users pact", data);
                    },
                    (err) => console.log(err),
                    () => this.isLoading = false
                );

                const httpOptions = this.getHTTPOptions(data.fitbit['access_token']);

                //gets fitbit user
                this.http.get('https://api.fitbit.com/1/user/-/profile.json', httpOptions).subscribe((data) => {
                    this.fitBitUser = data;
                    console.log("fitbit user", this.fitBitUser);
                    //updating number of remaining badges
                    console.log('number', this.num);

                    //passing badges to user's db
                    let fitbitBadges = this.fitBitUser.user.topBadges;
                    for(let i=0; i<Object.keys(fitbitBadges).length; i++) {
                        let formattedBadge = {
                            message: fitbitBadges[i].earnedMessage,
                            type: fitbitBadges[i].badgeType,
                            imgUrl: fitbitBadges[i].image300px
                        };
                        if(!this.user.badges.some(item => item['type'] === formattedBadge.type)){
                            this.user.badges.push(formattedBadge);
                            this.userService.editUser(this.user).subscribe(data => {
                                    console.log('user edited: now looks like: ', data);
                                },
                                (err) => console.log(err))
                        }
                        }
                });



                //gets fitbit activity for one day and creates svg circles with that data
                this.http.get('https://api.fitbit.com/1/user/-/activities/date/today.json', httpOptions).subscribe((data) => {
                    this.activityFcn(data);
                });

                //gets fitbit steps for 7 days and calls fcn to generate JSONs for bar graph
                //getting steps for 7 days
                let activityUrl = 'https://api.fitbit.com/1/user/-/activities/steps/date/today/7d.json';
                this.http.get(activityUrl, httpOptions).subscribe((data) => {
                    this.sevenDayStepsFcn(data);
                });

                //gets fitbit sleep for 7 days and calls fcn to generate JSONs for bar graph
                let sleepUrl = 'https://api.fitbit.com/1.2/user/-/sleep/list.json?beforeDate='+sevenBeforeFormatted+'&sort=desc&offset=0&limit=1';
                this.http.get(sleepUrl, httpOptions).subscribe((data) => {
                    this.sevenDaySleepFcn(data);
                });

                //gets calories for 7 days
                let calUrl = 'https://api.fitbit.com/1/user/-/activities/calories/date/today/7d.json';
                this.http.get(calUrl, httpOptions).subscribe((data) => {
                    this.sevenDayCalFcn(data);
                });
            },
            error => {
                console.log(error)
            },
            () => {
            });
    }



    //ARRAY GENERATION FOR GRAPHS
    //process user fitbit data on minutes of sleep recorded
    sevenDaySleepFcn(data){
        //generate json
        this.graphSleepJson = this.getGraphJSON(data['sleep'],'minutesAsleep', 60);
        this.xAxisLabelSleep = "Days";
        this.yAxisLabelSleep = "Sleep";
        //we are done loading things from the db, can load ui components now
    }

    //process user fitbit data on number of steps taken
    sevenDayStepsFcn(data){
        console.log('seven day step data', data);
        //generate json
        this.graphStepsJson = this.getGraphJSON(data['activities-steps'],'value', 1);
        this.xAxisLabelSteps = "Days";
        this.yAxisLabelSteps = "Steps";
    }

    //process user's data for calories for last 7 days
    sevenDayCalFcn(data){
        let calJson = [{
            'name': 'calories',
            'series': []
        }];
        let options = { weekday: 'long'};

        for (let i = Object.keys(data['activities-calories']).length-1; i >= 0; i--){
            let day = new Intl.DateTimeFormat('en-US', options).format(this.getDaysBefore(i))
            calJson[0]['series'][6-i] = ({
                'name' : day,
                'value' : data['activities-calories'][i]['value']
            })
        }
        this.graphCalsJson = calJson;
        console.log("graph cals", calJson)
    }

    //FITBIT PROCESSES
    //processes user's activity data from fitbit
    activityFcn(data){
        console.log("activity data is" , data);
        this.fitBitActivity = data;
        console.log("fitbit data is ", this.fitBitActivity);
        //creating circles
        let totalActiveMins = this.fitBitActivity.summary.veryActiveMinutes + this.fitBitActivity.summary.fairlyActiveMinutes + this.fitBitActivity.summary.lightlyActiveMinutes;
        let totalDistance = this.sumDistances(this.fitBitActivity.summary.distances);
        this.putSvgCircle("exerciseCircle", totalActiveMins, this.fitBitActivity.goals.activeMinutes, "Minutes Exercised", "#ff9f00");
        this.putSvgCircle("stepCircle", this.fitBitActivity.summary.steps, this.fitBitActivity.goals.steps, "Steps Taken", "#a41e11");
        this.putSvgCircle("calorieCircle", this.fitBitActivity.summary.caloriesOut, this.fitBitActivity.goals.caloriesOut, "Calories Burnt", "#44a730");
        this.putSvgCircle("distanceCircle", totalDistance, this.fitBitActivity.goals.distance, "Kilometers Walked", "#1f72ff");
    }

    //SVG FUNCTIONS
    //create the percent circle
    putSvgCircle(svgId, completedVal, totalVal, description, circleColor){
        //getting sizes and positions based on no of digits in values
        let totalValPos = this.getTotalValPos(totalVal);
        let completedValPos = this.getCompletedValPos(completedVal);
        let totalValSize = this.getTotalValSize(totalVal);

        let svg = document.getElementById(svgId); //Get svg element
        svg.setAttribute("viewBox", "0 0 36 36");
        //generating outer circle
        let theCircle = document.createElementNS('http://www.w3.org/2000/svg',"path");
        theCircle.setAttributeNS( null, "d", "M18 2.0845 " +
            "a 15.9155 15.9155 0 0 1 0 31.831" +
            "a 15.9155 15.9155 0 0 1 0 -31.831");
        theCircle.setAttributeNS(null, "style",
            "fill: none;" +
            "stroke: #eee;" +
            "stroke-width: 3.8;");
        svg.append(theCircle);

        //generating inner circle
        let percentCircle = document.createElementNS('http://www.w3.org/2000/svg',"path");
        percentCircle.setAttributeNS(null,"stroke-dasharray",  (completedVal/totalVal) * 100 + "," + 100);
        percentCircle.setAttributeNS(null, "d", "M18 2.0845" +
            "a 15.9155 15.9155 0 0 1 0 31.831" +
            " a 15.9155 15.9155 0 0 1 0 -31.831");
        percentCircle.setAttributeNS(null,"style", "" +
            "fill: none;" +
            "stroke: " + circleColor + ";" +
            "stroke-width: 2.8;" +
            "stroke-linecap: round;" +
            "animation: progress 1s ease-out forwards;");
        svg.append(percentCircle);


        //text for completed value in svg progress circle
        let numberText = document.createElementNS('http://www.w3.org/2000/svg',"text");
        numberText.setAttributeNS(null,"x", completedValPos);
        numberText.setAttributeNS(null,"y", "19");
        numberText.setAttributeNS(null, "style",
            "fill: #666;" +
            "font-family: sans-serif;" +
            "font-size: 0.4em;" +
            "text-anchor: middle;");
        numberText.innerHTML = completedVal;
        svg.append(numberText);


        //text for the total value in svg progress circles
        let totalText = document.createElementNS('http://www.w3.org/2000/svg',"text");
        totalText.setAttributeNS(null,"x", totalValPos);
        totalText.setAttributeNS(null,"y", "19");
        totalText.setAttributeNS(null, "style",
            "fill: #828282;" +
            "font-family: sans-serif;" +
            "font-size:" + totalValSize + ";" +
            "text-anchor: right;");
        totalText.innerHTML = "/"+totalVal;
        svg.append(totalText);

        //description text for progress cricle
        let descriptionText = document.createElementNS('http://www.w3.org/2000/svg',"text");
        descriptionText.setAttributeNS(null,"x", "18");
        descriptionText.setAttributeNS(null,"y","24");
        descriptionText.setAttributeNS(null,"class", "description");
        descriptionText.setAttributeNS(null, "style",
            "fill: #666;" +
            "font-family: sans-serif;" +
            "font-size: 0.15em;" +
            "text-anchor: middle;");
        descriptionText.innerHTML = description;
        svg.append(descriptionText);
    }



    //FCNS FOR HTML FILE
    //gets weight percentage for weight progress chart
    getWeightPercent(){
        let startWeight = this.user.stats.starting_weight;
        let endWeight = this.user.stats.goal_weight;
        let curWeight = this.getLastLog();
        let percent =  Math.round(Math.abs(100 - ((endWeight - curWeight) / (endWeight - startWeight)) * 100));
        // console.log("start", startWeight, "end", endWeight, "cur", curWeight, "percent", percent);
        return percent
    }

    //returns logs to show for tooltips on hover of weight loss progress bar
    getWeightData(){
        let goal = "Goal Weight: " + this.user.stats.goal_weight + " lbs";
        let lastLog = "Last Log: ";
        let remaining = "Remaining: ";
        let lastLogVal = this.getLastLog();
        lastLog += lastLogVal + " lbs";
        remaining +=  Math.abs(this.user.stats.goal_weight - lastLogVal) + " lbs";
        return goal + "  |  " + lastLog + "  |  " + remaining
    }

    //sets color of progress bar
    setProgressBarColor(){
        let weightPerc = this.getWeightPercent();
        if(weightPerc < 15) return "danger";
        else if(weightPerc < 75) return "warning";
        else return "success"
    }

    //generates json for graph
    getGraphJSON(theData, attr, divideBy){
        let options = { weekday: 'long'};
        let theJson = [];
        for (let i=6; i >= 0; i--){
            let day = new Intl.DateTimeFormat('en-US', options).format(this.getDaysBefore(i))
            theJson[6-i] = {
                'name' : day,
                'value' : 0
            }
        }
        for (let i=Object.keys(theData).length-1; i >= 0; i--){
            let day = new Intl.DateTimeFormat('en-US', options).format(this.getDaysBefore(i))
            theJson[6-i] = ({
                "name" : day,
                "value" : theData[i][attr] / divideBy
            })
        }
        return theJson;
    }

    //generate img overlay of avatar
    addImgOverlay(){
        //getting cur avatar element
        let avatar = document.getElementById("avatar");
        //setting opacity to low
        avatar.style.opacity = "0.6";
        let avatarContainer = document.getElementById("avatar-container");

        //add the image on the bottom right
        //and make the image more transparent

        //making new img obj and setting location and width
        let img = document.createElement("img");
        img.src = "/assets/camera.png";
        img.setAttribute("style", "position:absolute;");
        img.style.top = avatar.offsetHeight/2.7+"px";
        img.style.left = avatar.offsetWidth/3+"px";
        img.style.width = "30%";
        img.style.zIndex = "1000";
        img.style.opacity = "0.7";
        img.id = "camera-icon";
        //adding new image onto div
        avatarContainer.appendChild(img);
    }

    removeImgOverlay(){
        document.getElementById("camera-icon").remove();
        document.getElementById("avatar").style.opacity = "1";
    }

    generatePactMessage(){
        let pactText = document.getElementById("pact-text");
        let theRedirect = document.getElementById("redirect-to-pact");

        if (!this.user.pact){
            pactText.innerHTML = "You're not part of a pact yet!";
            theRedirect.innerHTML = "Click here to fix that";
        } else {
            pactText.innerHTML = "Your pact "+'"'+this.pact.name+'"'+" is waiting for you!";
            theRedirect.innerHTML = "Go to Pact"

        }
    }


    //GRAPH OPTIONS
    // options for the sleep bar chart
    //TODO figure out why graph doesnt automatically resize properly when view is removed
    showXAxis = true;
    showYAxis = true;
    gradient = false;
    showLegend = false;
    showXAxisLabel = false;
    showYAxisLabel = true;

    //sleep
    view: any[] = [570,500];
    xAxisLabelSleep;
    yAxisLabelSleep;

    //steps
    stepsView: any[] = [550, 600];
    xAxisLabelSteps;
    yAxisLabelSteps;

    ///calories
    calView: any[] = [550, 400];
    calYStepMin = 500;
    xAxisLabelCals = "Days";
    yAxisLabelCals = "Calories";


    timeline = true;
    colorScheme = {domain: ['#2e63db', '#92fa37', '#fad136', '#ff552b', '#90EE90', '#9370DB']};
    //pie
    showLabels = true;

    themeSubscription: any;




    //HELPERS
    //postiion of total value in svg
    getTotalValPos(totalVal){
        let totalValPos =  "18";

        if (totalVal/10 >= 1){totalValPos = "18"}
        if (totalVal/100 >= 1){totalValPos = "18"}
        if (totalVal/1000 >= 1){totalValPos = "20"}
        if (totalVal/10000 >= 1){totalValPos = "20"}
        return totalValPos
    }

    //size of total value in svg
    getTotalValSize(totalVal){
        if(totalVal/1000 >= 1){
            return "0.2em"
        } else {
            return "0.3em"
        }
    }

    //position of completed value in svg
    getCompletedValPos(completedVal){
        let completedValPos = "15";
        if (completedVal/10>=1){ completedValPos = "14"; }
        if (completedVal/100>=1){ completedValPos = "13";}
        if (completedVal/1000>=1){completedValPos = "13.5";}
        if (completedVal/10000>=1){completedValPos = "12";}
        return completedValPos
    }

    //sum distances walked/run given through fitbit data
    sumDistances(distanceJSON){
        let totalActiveMins = 0;
        for(let i = 0; i < Object.keys(distanceJSON).length; i++){
            totalActiveMins += distanceJSON[i]['distance'];
        }
        return totalActiveMins
    }

    //gets value days before the current day to use for any random stats
    getDaysBefore(value){
        return new Date(this.curDate.getFullYear(),
            this.curDate.getMonth(),
            this.curDate.getDate() - value);
    }

    //formats given date in yy-mm-dd format for fitbit http request input
    formatDates(dateInput){
        let yy = ''+dateInput.getFullYear();
        let mm = ''+(dateInput.getMonth()+1);
        let dd = ''+dateInput.getDate();

        if (mm.length < 2)
            mm = '0' + mm;
        if (dd.length < 2)
            dd = '0' + dd;
        return yy + '-' + mm + '-' + dd;
    }

    getLastLog(){
        let lastLogVal = this.user.stats.starting_weight;
        let logs = this.user.logs;
        let max_date = new Date(1979,1,1);
        for (let i=0; i<Object.keys(logs).length; i++){
            //find latest log
            if (new Date(logs[i].date)>max_date ){
                max_date = new Date(logs[i].date);
                lastLogVal = logs[i].weight;
            }
        }
        return lastLogVal
    }




    //PLACEHOLDERS
    //placeholder data for when fitbit connection doesnt work
    sevenDaySleepPlaceHolder(){
        let data = {
            sleep : {
                0: {dateOfSleep: new Date(), minutesAsleep: 480},
                1: {dateOfSleep: this.getDaysBefore(1), minutesAsleep: 350},
                2: {dateOfSleep: this.getDaysBefore(2), minutesAsleep: 180},
                3: {dateOfSleep: this.getDaysBefore(3), minutesAsleep: 400},
                4: {dateOfSleep: this.getDaysBefore(4), minutesAsleep: 130},
                5: {dateOfSleep: this.getDaysBefore(5), minutesAsleep: 325},
                6: {dateOfSleep: this.getDaysBefore(6), minutesAsleep: 450}
            }
        };

        console.log('placeholder seven day sleep data', data);
        this.isLoading = false;
       this.sevenDaySleepFcn(data)
    }


    sevenDayStepsPlaceHolder(){
        let data = {
            'activities-steps': {
                0: {dateTime: new Date(), value: "6000"},
                1: {dateTime: this.getDaysBefore(1), value: "4259"},
                2: {dateTime: this.getDaysBefore(2), value: "8038"},
                3: {dateTime: this.getDaysBefore(3), value: "12032"},
                4: {dateTime: this.getDaysBefore(4), value: "5526"},
                5: {dateTime: this.getDaysBefore(5), value: "4255"},
                6: {dateTime: this.getDaysBefore(6), value: "7596"}
            }
        };
        console.log('placeholder seven day steps data', data);
        this.fitBitActivity = data
        this.sevenDayStepsFcn(data)
    }


    activitiesPlaceHolder(){
        let data = {
            summary : {
                veryActiveMinutes: 80,
                fairlyActiveMinutes: 30,
                lightlyActiveMinutes: 120,
                distances: {
                    0: {activity: "total", distance: 6.5},
                    1: {activity: "tracker", distance: 3.1},
                    2: {activity: "loggedActivities", distance: 1.5},
                    3: {activity: "veryActive", distance: 0.9},
                    4: {activity: "moderatelyActive", distance: 0.4},
                    5: {activity: "lightlyActive", distance: 0.6},
                    6: {activity: "sedentaryActive", distance: 0},
                },
                caloriesOut: 2000,
                steps: 6000
            },
            goals : {
                activeMinutes: 120,
                steps: 10000,
                caloriesOut: 2500,
                distance: 8.05
            }
        };
        console.log('placeholder activity data', data);
        this.activityFcn(data);
    }

    caloriesPlaceHolder(){
        let data = {
            'activities-calories': {
                0:  { "name": this.getDaysBefore(0), "value": 1500 },
                1 : { "name": this.getDaysBefore(1), "value": 1000 },
                2 : { "name": this.getDaysBefore(2), "value": 2300 },
                3 : { "name": this.getDaysBefore(3), "value": 1000 },
                4 : { "name": this.getDaysBefore(4), "value": 1000 },
                5 : { "name": this.getDaysBefore(5), "value": 1000 },
                6 : { "name": this.getDaysBefore(6), "value": 1000 }
            }
        };
        this.graphCalsJson = data;
        this.sevenDayCalFcn(data);
    }

}


