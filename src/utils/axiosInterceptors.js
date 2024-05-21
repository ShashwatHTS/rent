// axiosInterceptor.js
import axios from "axios";

// Your API endpoint for refreshing the token
const refreshEndpoint = "/refresh-token-endpoint";

// Function to check if the token is expired
function checkTokenExpiration(token) {
    // Implement your own logic to check token expiration
    // You may use a library like jwt-decode to extract the expiration time from the token
    const decodedToken = decodeToken(token);
    const currentTime = Math.floor(Date.now() / 1000); // Convert to seconds

    return decodedToken.exp < currentTime;
}

// Function to decode the JWT token
function decodeToken(token) {
    // Implement your own decoding logic or use a library like jwt-decode
    // Example: jwt-decode library can be used as follows
    // return jwt_decode(token);
}

// Add a request interceptor globally
axios.interceptors.request.use(
    async (config) => {
        // Check if access_token is available and not expired
        const accessToken = localStorage.getItem("access_token");

        if (accessToken) {
            // Check if the token is expired
            const isTokenExpired = checkTokenExpiration(accessToken);

            if (isTokenExpired) {
                // If the token is expired, refresh it
                try {
                    const response = await axios.post(refreshEndpoint, {
                        refresh_token: localStorage.getItem("refresh_token"),
                    });

                    // Update the access token in the localStorage
                    localStorage.setItem(
                        "access_token",
                        response.data.access_token
                    );

                    // Set the new access token in the request header
                    config.headers[
                        "Authorization"
                    ] = `Bearer ${response.data.access_token}`;
                } catch (error) {
                    // Handle refresh token failure (e.g., redirect to login)
                    console.error("Failed to refresh token:", error);
                    // Redirect to login or handle the situation as needed
                }
            } else {
                // If the token is not expired, set it in the request header
                config.headers["Authorization"] = `Bearer ${accessToken}`;
            }
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
