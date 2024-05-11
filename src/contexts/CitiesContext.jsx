import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useReducer,
} from 'react';
import axios from 'axios';

const BASE_URL = 'https://wanderlust-8qb8.onrender.com';
const CitiesContext = createContext();

const initialState = {
    cities: [],
    isLoading: false,
    currentCity: {},
    error: '',
};

function reducer(state, action) {
    switch (action.type) {
        case 'loading':
            return { ...state, isLoading: true };
        case 'cities/loaded':
            return { ...state, isLoading: false, cities: action.payload };
        case 'city/loaded':
            return { ...state, isLoading: false, currentCity: action.payload };
        case 'city/created':
            return {
                ...state,
                isLoading: false,
                cities: [...state.cities, action.payload],
                currentCity: action.payload,
            };
        case 'city/deleted':
            return {
                ...state,
                isLoading: false,
                cities: state.cities.filter(
                    (city) => city.id !== action.payload
                ),
                currentCity: {},
            };
        case 'rejected':
            return { ...state, isLoading: false, error: action.payload };

        default:
            throw new Error('Invalid action');
    }
}

function CitiesProvider({ children }) {
    const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
        reducer,
        initialState
    );

    useEffect(() => {
        const fetchCities = async () => {
            dispatch({ type: 'loading', payload: true });

            try {
                const res = await axios.get(`${BASE_URL}/cities`);
                const data = await res.data;
                dispatch({ type: 'cities/loaded', payload: data });
            } catch {
                dispatch({
                    type: 'rejected',
                    payload: 'Error fetching city data...',
                });
            }
        };
        fetchCities();
    }, []);

    const getCity = useCallback(
        async function getCity(id) {
            if (id === currentCity.id) return;

            dispatch({ type: 'loading', payload: true });

            try {
                const res = await axios.get(`${BASE_URL}/cities/${id}`);
                const data = await res.data;
                dispatch({ type: 'city/loaded', payload: data });
            } catch {
                dispatch({
                    type: 'rejected',
                    payload: 'Error fetching city data...',
                });
            }
        },
        [currentCity.id]
    );

    async function createCity(newCity) {
        dispatch({ type: 'loading', payload: true });

        try {
            const res = await axios.post(
                `${BASE_URL}/cities`,
                JSON.stringify(newCity),
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            const data = await res.data;

            dispatch({ type: 'city/created', payload: data });
        } catch {
            dispatch({
                type: 'rejected',
                payload: 'There was an error creating the city',
            });
        }
    }

    async function deleteCity(id) {
        dispatch({ type: 'loading', payload: true });

        try {
            await axios.delete(`${BASE_URL}/cities/${id}`);

            dispatch({ type: 'city/deleted', payload: id });
        } catch {
            dispatch({
                type: 'rejected',
                payload: 'There was an error deleting the city',
            });
        }
    }

    return (
        <CitiesContext.Provider
            value={{
                cities,
                isLoading,
                currentCity,
                getCity,
                createCity,
                deleteCity,
                error,
            }}
        >
            {children}
        </CitiesContext.Provider>
    );
}

function useCities() {
    const context = useContext(CitiesContext);
    if (context === undefined)
        throw new Error('The useCities should be inside <CitiesProvider>');

    return context;
}

export { CitiesProvider, useCities };
