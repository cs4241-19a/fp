//Initial state (Displaying the help menu)
//each state has "next" and "prev" functions to denote the next state and previous state


//loginmenu?
let Helpmenu = function(){
    this.prevStates = this;
    this.next = function (){
        return new Mainmenu(this.prevStates);
    };
    this.prev = function(){
        return new Mainmenu(this.prevStates);
    };
};
let Mainmenu = function(prevStates){
    this.prevStates = prevStates;
    this.next = function (){
        //get currently selected menu option
        return new Mainmenu(prevStates);
    };
    this.prev = function(){
        return prevStates;
    };
};
let Coursemenu = function(prevStates){
    this.prevStates = prevStates;
    this.next = function (){
        //get currently selected menu option
        return new Mainmenu(prevStates);
    };
    this.prev = function(){
        return prevStates;
    };
};
let Songmenu = function(prevStates){
    this.prevStates = prevStates;
    this.next = function (){
        //get currently selected menu option
        return new Mainmenu(prevStates);
    };
    this.prev = function(){
        return prevStates;
    };
};
let Difficultymenu = function(prevStates){
    this.prevStates = prevStates;
    this.next = function (){
        //get currently selected menu option
        return new Mainmenu(prevStates);
    };
    this.prev = function(){
        return prevStates;
    };
};
let Gameplaying = function(prevStates){
    this.prevStates = prevStates;
    this.next = function (){
        //get currently selected menu option
        return new Mainmenu(prevStates);
    };
    this.prev = function(){
        return prevStates;
    };
};
let Pausemenu = function(prevStates){
    this.prevStates = prevStates;
    this.next = function (){
        //get currently selected menu option
        return new Mainmenu(prevStates);
    };
    this.prev = function(){
        return prevStates;
    };
};
let Songcomplete = function(prevStates){
    this.prevStates = prevStates;
    this.next = function (){
        //get currently selected menu option
        return new Mainmenu(prevStates);
    };
    this.prev = function(){
        return prevStates;
    };
};
