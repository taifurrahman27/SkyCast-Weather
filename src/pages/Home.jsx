import { useState } from 'react';

import Hero from '../components/home/Hero';
import WeatherDisplay from '../components/home/WeatherDisplay';
import LocationModal from '../components/home/LocationModal';
import useWeather from '../hooks/useWeather';

const Home = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [city, setCity] = useState('');

    const {
        location,
        error,
        isLocating,
        coordinates,
        weather,
        isLoading,
        weatherError,
        handleCitySubmit,
        handleCurrentLocation,
        resetErrors,
        clearError,
    } = useWeather();

    const openLocationModal = () => {
        resetErrors();
        setIsModalOpen(true);
    };

    const closeLocationModal = () => {
        if (isLoading || isLocating) return;

        setIsModalOpen(false);
        clearError();
    };

    const handleCityChange = (value) => {
        setCity(value);
        clearError();
    };

    const onCitySubmit = async (event) => {
        const success = await handleCitySubmit(event, city);

        if (success) {
            setIsModalOpen(false);
            setCity('');
        }
    };

    return (
        <main className="min-h-screen bg-slate-950 px-3 py-6 text-white">
            <div className="mx-auto max-w-5xl">
                <Hero
                    location={location}
                    onOpenModal={openLocationModal}
                />

                <WeatherDisplay
                    weather={weather}
                    location={location}
                    coordinates={coordinates}
                    isLoading={isLoading}
                    weatherError={weatherError}
                    onOpenModal={openLocationModal}
                />
            </div>

            <LocationModal
                isOpen={isModalOpen}
                city={city}
                error={error}
                isLoading={isLoading}
                isLocating={isLocating}
                onCityChange={handleCityChange}
                onCitySubmit={onCitySubmit}
                onCurrentLocation={handleCurrentLocation}
                onClose={closeLocationModal}
            />
        </main>
    );
};

export default Home;
