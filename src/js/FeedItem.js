import React from 'react';
import { Paper, Typography, Avatar, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useStoreState, useStoreActions } from 'easy-peasy';
import * as dat from "dat.gui";
import {audioGraph, audioInit, getCanvas} from "./setUpModule";
import {visualizer} from "./visualizerModule";

export default function FeedItem(props) {

    /* Props: 
     * song - {title: "foo", artist: "foo"}
     * user - {username: "foo", name: "foo"}
     * options - {height: 0, length: 0, file: 0}
     */

    async function handleClick() {
        console.log('paper has been clicked');

        //get song and play it for the vis


    }

    const gui = new dat.GUI()

    let currColor = 0

    const blue = function () {
        currColor = 0
    }

    const green = function () {
        currColor = 1
    }

    const changeParam = new function () {
        this.barHeight = 1
        this.barWidth = 4
        this.barFit = 2
        this.canvasClr = '#000000'
    }()

    const startMello = function () {
        console.log("yoooooooo")
        const canvas = getCanvas()

        const jsonAudioInit = audioInit(canvas)
        const jsonAudioGraph = audioGraph(canvas, jsonAudioInit)

        jsonAudioInit.audioElement.src = 'mello.mp3'
        jsonAudioInit.audioElement.play()

        const results = new Uint8Array(jsonAudioGraph.analyser.frequencyBinCount)

        const draw = function () {
            window.requestAnimationFrame(draw)
            visualizer(canvas, jsonAudioInit, jsonAudioGraph, results, currColor, changeParam.barHeight, changeParam.barWidth, changeParam.barFit, changeParam.canvasClr)
        }
        draw()
    }

    window.localStorage;
    window.onload = function () {

        console.log("dddd");

        document.getElementById('mello').onclick = startMello
        document.getElementById('blue').onclick = blue
        document.getElementById('green').onclick = green

        gui.add(changeParam, 'barHeight', 0, 3).name('Bar Height')
        gui.add(changeParam, 'barWidth', 0, 6).name('Bar Width')
        gui.add(changeParam, 'barFit', 0.5, 5).name('Visualizer Fit')
        gui.addColor(changeParam, 'canvasClr').name('Canvas Color')
    }

    const useStyles = makeStyles({
        container: {
            
        },
        paper: {
            display: 'flex',
            flexDirection: 'row',
            padding: '15px 15px',
            borderRadius: '15px',
            cursor: 'pointer',
            margin: '10px'
        },
        avatar: {
            margin: 10,
            backgroundColor: '#141115'
        },
        button: {
            // margin: '1'
        }
    })

    const classes = useStyles();

    return (

        <div className="w-full">
            <div className="w-full my-5">
                <div className="w-full">
                    <div className="w-full bg-white rounded overflow-hidden shadow-lg">
                        <div className="w-full">
                            <div id="container">
                                <div id="canvas" className="h-64"></div>
                                <div id="btnContainer">
                                    <button id="mello" className="btn" onClick={startMello}>Mellow Music</button>
                                </div>
                                <div id="btnContainer2">
                                    <button className="lbl">Color</button>
                                    <button id="blue" className="btn">Blue - Green</button>
                                    <button id="green" className="btn">Green - Red</button>
                                </div>
                            </div>
                        </div>
                        <div className="w-full h-64 border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-t lg:rounded-t-none lg:rounded-l p-4 flex flex-col justify-between leading-normal">
                            <div className="mb-8">
                                <p className="text-sm text-gray-600 flex items-center">
                                </p>
                                <div className="text-gray-900 font-bold text-xl mb-2">We have awesome audio visualizers!</div>
                                <p className="text-gray-700 text-base">
                                    Visualize the awesome tracks that you upload! We have a wide range of customizable visualizers.
                                </p>
                            </div>
                            <div className="w-full">
                                        <span
                                            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#visualize</span>
                                <span
                                    className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#graphics</span>
                                <span
                                    className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#colors</span>
                            </div>
                            <div className="flex items-center">
                                <img className="w-10 h-10 rounded-full mr-4" src={require("../media/Manas.jpg")}
                                     alt="Avatar of Manas Mehta"/>
                                <div className="text-sm">
                                    <p className="text-gray-900 leading-none">Manas Mehta</p>
                                    <p className="text-gray-600">Oct 8</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={classes.container}>
                <Paper className={classes.paper} onClick={handleClick}>
                    {/* <Button
                        variant="contained"
                        className={classes.button}
                        color="primary">
                            View
                    </Button> */}

                    <div>
                        <Typography variant="h5">
                            {props.song.title} - {props.song.artist}
                        </Typography>
                        <Typography component="p">
                            Uploaded by {props.user.username}
                        </Typography>
                    </div>
                    <Avatar className={classes.avatar}>N</Avatar>
                </Paper>
            </div>
        </div>
    )

}