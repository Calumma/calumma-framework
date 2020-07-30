import { useState } from 'react';

export const store = {
    state: {},
    setState(value) {
        this.state = value;
        this.setters.forEach(setter => setter(this.state));
    },
    setters: []
};

// Bind the setState function to the store object so 
// we don't lose context when calling it elsewhere
store.setState = store.setState.bind(store);

// this is the custom hook we'll call on components.
const useFeedbackStore = () => {
    const [state, set] = useState(store.state);
    if (!store.setters.includes(set)) {
        store.setters.push(set);
    }

    return [state, store.setState];
}

const useFeedback = () => {

    store.state = { open: false }
    const [config, setConfig] = useFeedbackStore();

    const showFeedback = (variant, message) => {
        setConfig(config => ({ ...config, ['variant']: variant }));
        setConfig(config => ({ ...config, ['message']: message }));
        setConfig(config => ({ ...config, ['open']: true }));
    };

    return {
        showFeedback
    };
};

export default  useFeedback;
export { useFeedbackStore }
