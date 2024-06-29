const basePath = "/";
const determineTransitionType = (oldNavigationEntry, newNavigationEntry) => {
  const currentURL = new URL(oldNavigationEntry.url);
  const destinationURL = new URL(newNavigationEntry.url);

  const currentPathname = currentURL.pathname.replace(basePath, "");
  const destinationPathname = destinationURL.pathname.replace(basePath, "");

  if (currentPathname === destinationPathname) {
    return "reload";
  } else {
    let currentPageIndex = currentPathname
      .replace("/index", "")
      .replace("/", "")
      .replace(".html", "");
    let destinationPageIndex = destinationPathname
      .replace("/index", "")
      .replace("/", "")
      .replace(".html", "");

    // The first page has no number in its path
    currentPageIndex = currentPageIndex ? parseInt(currentPageIndex) : 1;
    destinationPageIndex = destinationPageIndex
      ? parseInt(destinationPageIndex)
      : 1;

    if (currentPageIndex > destinationPageIndex) {
      return "backwards";
    }
    if (currentPageIndex < destinationPageIndex) {
      return "forwards";
    }

    return "unknown";
  }
};
window.addEventListener("pageswap", async (e) => {
  if (e.viewTransition) {
    const transitionType = determineTransitionType(
      e.activation.from,
      e.activation.entry
    );
    console.log(`pageSwap: ${transitionType}`);

    e.viewTransition.types.add(transitionType);
  }
});
window.addEventListener("pagereveal", async (e) => {
  if (e.viewTransition) {
    const transitionType = determineTransitionType(
      navigation.activation.from,
      navigation.activation.entry
    );
    console.log(transitionType);

    e.viewTransition.types.add(transitionType);
  }
});
