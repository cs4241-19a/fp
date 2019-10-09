import React from 'react';
import { createStore, StoreProvider } from 'easy-peasy';
import model from './store';
import FeedContainer from './FeedContainer'
import FeedItem from './FeedItem';

export default function profileApp(props) {

    const store = createStore(model);

    const song = {title: "asdf", artist: "asdf", file: 0},
          user = {username: "XxX_420_newbRekr_69_XxX", name: "Bob"},
          options  = {height: 0, length: 0};

    window.localStorage;
    window.onload = function () {
    }

    return (
        <StoreProvider store={store}>
            <FeedContainer />
            <div className="w-full">
                <div className="w-full">
                    <div className="w-full bg-white rounded overflow-hidden shadow-lg">
                        <img className="w-full" src={require("../media/appVisual.png")} alt="Vis"/>
                        <div
                            className="w-full h-64 border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-t lg:rounded-t-none lg:rounded-l p-4 flex flex-col justify-between leading-normal">
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
            <div className="w-full">
                <div className="w-full">
                    <div className="w-full bg-white rounded overflow-hidden shadow-lg">
                        <img className="w-full" src={require("../media/appVisual.png")} alt="Vis"/>
                        <div
                            className="w-full h-64 border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-t lg:rounded-t-none lg:rounded-l p-4 flex flex-col justify-between leading-normal">
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
            <div className="w-full">
                <div className="w-full">
                    <div className="w-full bg-white rounded overflow-hidden shadow-lg">
                        <img className="w-full" src={require("../media/appVisual.png")} alt="Vis"/>
                        <div
                            className="w-full h-64 border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-t lg:rounded-t-none lg:rounded-l p-4 flex flex-col justify-between leading-normal">
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
            <div className="w-full">
                <div className="w-full">
                    <div className="w-full bg-white rounded overflow-hidden shadow-lg">
                        <img className="w-full" src={require("../media/appVisual.png")} alt="Vis"/>
                        <div
                            className="w-full h-64 border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-t lg:rounded-t-none lg:rounded-l p-4 flex flex-col justify-between leading-normal">
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
            <div className="w-full">
                <div className="w-full">
                    <div className="w-full bg-white rounded overflow-hidden shadow-lg">
                        <img className="w-full" src={require("../media/appVisual.png")} alt="Vis"/>
                        <div
                            className="w-full h-64 border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-t lg:rounded-t-none lg:rounded-l p-4 flex flex-col justify-between leading-normal">
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

            <div className="lg:text-center bottomBanner"> Designed and developed in Worcester, Massachusetts </div>
        </StoreProvider>
    )

}