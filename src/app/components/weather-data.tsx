import React from 'react';

import CurrentConditions from './current-conditions';
import HourlyForecast from './hourly-forecast';
import DailyForecast from './daily-forecast';

// TODO: Finish WeatherData component
class WeatherData extends React.Component<{loaded: boolean}> {
    render() {
        return this.props.loaded ? (
            // After the user selects a city, show the weather data
            <div className="flex flex-col items-center space-x-2">
                <CurrentConditions/>
                
                {/* TODO: Add city name via reference to database */}
                <div className="text-center text-lg font-medium text-gray-800 mb-6">
                    <h1 className="text-2xl font-bold">City</h1>
                </div>

                <HourlyForecast/>
                <DailyForecast/>
            </div>
        ) : (
            // Before the user selects a city, show a message to input a city
            <div className="p-6 text-center">
                <h1 className="text-2xl font-bold">Input a city to get the weather!</h1>
            </div>
        );
    }
}

export default WeatherData;