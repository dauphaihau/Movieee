import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunk from 'redux-thunk';
import {CarouselReducer} from "./reducers/CarouselReducer";
import {FilmsReducer} from "./reducers/FilmsReducer";
import {CinemaSystemReducer} from "./reducers/CinemaSystemReducer";
import {UserReducer} from "./reducers/UserReducer";
import {TicketManagementReducer} from "./reducers/TicketManagementReducer";
import {LoadingReducer} from "./reducers/LoadingReducer";
import {composeWithDevTools} from 'redux-devtools-extension';

const rootReducer = combineReducers({
    CarouselReducer,
    FilmsReducer,
    CinemaSystemReducer,
    UserReducer,
    TicketManagementReducer,
    LoadingReducer,
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
