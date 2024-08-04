

export function execOnlyDevEnv(callback: () => void) {
    const environment = process.env.NODE_ENV ?? 'development';
    if (environment === 'development') {
        callback();
    }
}