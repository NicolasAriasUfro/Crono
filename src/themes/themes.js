export const moraCremaTheme = {
    dark: false,
    colors: {
        background: "#F7F6FE",
        surface: "#15202b",
        primary: "#7262BC",
        primary_light_1: "#8b84d0",
        primary_light_2: "#B9BBE8",
        primary_light_3: "#d4d6f1",
        secondary: "#EF85E6",
        secondary_light_1: "#fad4f9",
        secondary_light_2: "#fdeafd",
        error: "#f44336",
        info: "#2196F3",
        success: "#F06090",
        success_light_1: "#f8a9c5",
        warning: "#fb8c00",
    },
    variables: {
        primary: "#7262BC",
        "black-text": "#0C0524",
    },
};

export const frutosRojosTheme = {
    dark: true,
    colors: {
        background: "#EC407A",
        surface: "#15202b",
        primary: "#7262BC",
        secondary: "#EF85E6",
        error: "#f44336",
        info: "#2196F3",
        success: "#F06090",
        warning: "#fb8c00",
    },
};

export const temasArray = [
    {
        name: "moraCremaTheme",
        src: require("@/assets/mora-crema.jpg"),
    },
    {
        name: "frutosRojosTheme",
        src: require("@/assets/frutos-rojos.jpg"),
    },
    {
        name: "chirimoyaAlegreTheme",
        src: require("@/assets/chirimoya-alegre.jpg"),
    },
    {
        name: "mentaTheme",
        src: require("@/assets/menta.jpg"),
    },
];