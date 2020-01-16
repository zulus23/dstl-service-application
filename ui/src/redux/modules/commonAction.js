export const GTK_LOAD_CURRENT_USER = 'GTK_LOAD_CURRENT_USER';
export const GTK_CLEAN_CURRENT_USER = 'GTK_CLEAN_CURRENT_USER';


export const loadCurrentUser = (token) => {
    return {type:GTK_LOAD_CURRENT_USER,payload:token}
}

export const cleanCurrentUser = () => {
    return {type:GTK_CLEAN_CURRENT_USER}
}
