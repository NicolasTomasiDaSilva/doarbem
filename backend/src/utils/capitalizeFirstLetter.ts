function capitalizeFirstLetter(path: string | null): string {
  if (!path) {
    return "";
  }
  return path.charAt(0).toUpperCase() + path.slice(1);
}

export { capitalizeFirstLetter };
