export default function ({ $axios }) {
    $axios.onRequest(config => {
        config.headers.common['X-Auth-Token'] = 'f1fe4551488c4b94b8c9b6f719d560a7' // must be .env
    });
}