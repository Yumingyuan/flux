
const isConfluxPortalInstalled = (setCPinstalled) => {
    const installed =  Boolean(window.conflux && window.conflux.isConfluxPortal);
    setCPinstalled(installed);
}

const onClickConnect = async () => {
    await window.conflux.enable()
}

export default {
    isConfluxPortalInstalled,
    onClickConnect
}