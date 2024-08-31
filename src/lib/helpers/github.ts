const cdn_base_url = "https://avatars.githubusercontent.com";

// Function to generate the user avatar URL
const user_avatar = (user_id: number): string => {
    return `${cdn_base_url}/u/${user_id}?v=4`;
};

export default {
    cdn: {
        user_avatar
    }
};
