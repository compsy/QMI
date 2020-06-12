import React from 'react'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core'
import './components/Editor/background.css'
import { Provider } from 'react-redux'
import store from './store'
import { Auth0Provider } from './components/Authentication Dialog/react-auth0-spa'
import history from './utils/history'
import { useDarkMode } from './customHooks/useDarkMode'
import { auth_config } from './features/API/auth_config'
import AppBarComponent from './components/App Bar/AppBarComponent'

// A function that routes the user to the right place
// after login
const onRedirectCallback = (appState) => {

    history.push(
        appState && appState.targetUrl
            ? appState.targetUrl
            : window.location.pathname,
    );
};

function App() {
    const [theme, toggleDarkMode] = useDarkMode();
    const themeConfig = createMuiTheme(theme);
    return (
        <Auth0Provider
            domain={auth_config.domain}
            client_id={auth_config.clientId}
            redirect_uri={window.location.origin}
            onRedirectCallback={onRedirectCallback}
            audience={auth_config.audience}
            responseType={auth_config.responseType}
            scope={auth_config.scope}
        >
            <Provider store={store}>
                <div className="content">
                    <MuiThemeProvider theme={themeConfig}>
                        <AppBarComponent theme={theme} themeConfig={themeConfig} toggleDarkMode={toggleDarkMode}/>
                    </MuiThemeProvider>
                </div>
            </Provider>
        </Auth0Provider>
    );
}

export default App;
