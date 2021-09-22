const checkValue = (value, searchQuery) => {
  return value ? value.toLowerCase().includes(searchQuery) : false;
}

export function searchMovies (searchQuery, moviesList) {
  const query = searchQuery.toLowerCase();

  const foundMovies = moviesList.filter((movie) => {
    const value1 = checkValue(movie.nameRU, query);
    const value2 = checkValue(movie.director, query);
    const value3 = checkValue(movie.country, query);
    const value4 = checkValue(movie.year, query);
    return (value1 || value2 || value3 || value4);
  });

  return foundMovies;
}
