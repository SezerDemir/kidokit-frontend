import React from "react";

export function WelcomepageContainer(){
    
    const accessTok: string | null = sessionStorage.getItem("accessToken");
    const refreshTok: string | null = sessionStorage.getItem("refreshToken");
    const userId: string | null = sessionStorage.getItem("userId");
    return(
        <div>
            <h1> User Id: {userId} </h1>
            <h1> Access Token: {accessTok} </h1>
            <h1> Refresh Token: {refreshTok} </h1>
        </div>
    );
}