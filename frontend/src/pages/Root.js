import {Outlet, useLoaderData, useNavigation, useSubmit} from 'react-router-dom';

import MainNavigation from '../components/MainNavigation';
import {useEffect} from "react";
import {getTokenDuration} from "../util/auth";

function RootLayout() {
    const token = useLoaderData();
    const submit = useSubmit()

    useEffect(() => {
        if(!token) {
            return;
        }

        if(token === 'EXPIRED_TOKEN'){
            submit(null, {ation: '/logout', method: 'post'})
        }

        const tokenDuration = getTokenDuration();
        console.log(tokenDuration)

        setTimeout(() => {
            submit(null, {ation: '/logout', method: 'post'})
        }, tokenDuration);

        return () => {
            clearTimeout();
        };
    }, [token, submit]);

  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
