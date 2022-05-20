let runWhenExist = async (exist, func) => {
    while (exist == null) {
        await new Promise((resolve) => setTimeout(() => resolve(), 500));
    }
    func();
};
export {runWhenExist};
