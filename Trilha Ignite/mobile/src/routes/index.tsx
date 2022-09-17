import { NavigationContainer } from '@react-navigation/native'
import { AppRoutes } from './app.routes'



export function ScreenRoutes(){
    return (
        <NavigationContainer>
            <AppRoutes />
        </NavigationContainer>
    )
}