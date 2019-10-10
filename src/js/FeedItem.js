import React from 'react';
import {audioGraph, audioInit, getCanvas} from "./setUpModule";
import {visualizer} from "./visualizerModule";

export default function FeedItem(props) {

    /* Props: 
     * song - {title: "foo", artist: "foo"}
     * user - {username: "foo", name: "foo"}
     * options - {height: 0, length: 0, file: 0}
     */

    const handleClick = function (e) {
        e.preventDefault();
        console.log('paper has been clicked');

        let currColor = 0;

        //TODO pull song

        console.log("yoooooooo")
        const canvas = getCanvas()

        const jsonAudioInit = audioInit(canvas)
        const jsonAudioGraph = audioGraph(canvas, jsonAudioInit)

        switch (props.color) {
            case 'Blue - Green':
                currColor = 0;
                break;
            case 'Green - Red':
                currColor = 1;
                break;
            case 'Pink - Green':
                currColor = 2;
                break;
            case 'Red - Green':
                currColor = 3;
                break;
        }

        switch (props.song) {
            case 'Back in Black (AC/DC)':
                jsonAudioInit.audioElement.src = 'music/acdc.mp3'
                break;
            case 'Deutschland (Rammstein)':
                jsonAudioInit.audioElement.src = 'music/deutschland.mp3'
                break;
            case 'Bangarang (Skrillex)':
                jsonAudioInit.audioElement.src = 'music/dubstep.mp3'
                break;
            case 'Exploder (Audioslave)':
                jsonAudioInit.audioElement.src = 'music/exploder.mp3'
                break;
            case 'Divenire (Ludovico Einaudi)':
                jsonAudioInit.audioElement.src = 'music/inst.mp3'
                break;
            case 'Shelter (Porter Robinson)':
                jsonAudioInit.audioElement.src = 'music/shelter.mp3'
                break;
        }

        jsonAudioInit.audioElement.controls = true;
        jsonAudioInit.audioElement.play()

        const results = new Uint8Array(jsonAudioGraph.analyser.frequencyBinCount)

        const draw = function () {
            window.requestAnimationFrame(draw)
            visualizer(canvas, jsonAudioInit, jsonAudioGraph, results, currColor, props.barH, props.barW, props.barW, props.canClr)
        }
        draw()
    }

    return (
        <div className="w-full my-5">
            <div className="w-full bg-white rounded overflow-hidden shadow-lg glower yaay">
                <div className="w-full h-48 border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-t lg:rounded-t-none lg:rounded-l p-4 flex flex-col justify-between leading-normal">
                    <div className="mb-8">
                        <p className="text-sm text-gray-600 flex items-center">
                        </p>
                        <div className="text-gray-900 font-bold text-xl mb-2">{props.title}</div>
                        <p className="text-gray-700 text-base">
                            {props.desc}
                        </p>
                    </div>
                    <div className="w-full flex border-t-2 border-gray-400 pt-5">
                        <div className="flex w-10/12 items-center">
                            <img className="w-10 h-10 rounded-full mr-4" src={require("../media/Manas.jpg")}
                                 alt="Avatar of Manas Mehta"/>
                            <div className="text-sm">
                                <p className="text-gray-900 leading-none">{props.user}</p>
                                <p className="text-gray-600">Oct 8</p>
                            </div>
                        </div>
                        <div id="btnContainer" className="w-2/12">
                            <button id="mello" className="text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={handleClick}>Play</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}