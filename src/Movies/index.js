import React, { useEffect, useState, useMemo } from 'react';
import axios from "axios";
import './index.scss'
// import _ from "lodash";

const url = 'https://the-one-api.dev/v2/movie';
const apiToken = '5sn22IKN7mtbKyc7N-xo';

const getMovies = async () => axios.get(url, {
		headers: {
			Authorization: `Bearer ${apiToken}`
		}
	});

const Movies = () => {
	const [movielist, updateMovieList] = useState([]);
	const [currentSearchString, setCurrentSearchString] = useState('');
	const [currentOrder, setCurrentOrder] = useState('asc');

	useEffect(() => {
		async function fetchMovies(){
			const movies = await getMovies()
			updateMovieList(movies.data.docs)
		}
		if(movielist.length === 0){
			fetchMovies();
		}		
	}, [])

	const handleSelectChange = e => {
		setCurrentOrder(e.target.value);
	}

	const handleInputOnChange = e => setCurrentSearchString(e.target.value)

	const ascendingSort = (a, b) => {
		if (a.name < b.name) {
			return -1;
		}
		if (b.name < a.name) {
			return 1;
		}
		return 0;
	}

	const descendingSort = (a, b) => {
		if (a.name > b.name) {
			return -1;
		}
		if (b.name > a.name) {
			return 1;
		}
		return 0;
	}

	const currentMovies = useMemo(() => {
		if(!movielist){
			return []
		}

		return movielist
				.filter((value) => {
					console.log({
						currentSearchString,
						name: value.name
					})
					return value.name.toLowerCase().includes(currentSearchString.toLowerCase());
				})
				.sort( currentOrder === 'asc' ? ascendingSort :descendingSort );

	},[movielist, currentOrder, currentSearchString])

	return (
		<div className="challenge">
			<div className="movie-list-header">
				<div className="movie-list-header-title">
					<h1>Lord of The Rings Movies</h1>
					<p>
						Ave. movie runtime: xxx min <br />
						Ave. movie budget: $M
					</p>
				</div>
				<form className="movie-list-form">
					<input onChange={handleInputOnChange} />
					<select value={currentOrder} onChange={handleSelectChange}>
						<option value="asc">Sort by name ASC</option>
						<option value="desc">Sort by name DESC</option>
					</select>
				</form>
			</div>
			<section className='movie-list'>
				{currentMovies.map(movie => {
					return (
						<div className="movie-list-item" key={movie._id}>
							<div className="movie-list-item-poster"></div>
							<div className="movie-list-item-content">
								<h2>{movie.name}</h2>
								<div className="movie-list-item-runtime">{movie.runtimeInMinutes} min</div>
								<div className="movie-list-item-wins">
									<svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path fillRule="evenodd" clipRule="evenodd" d="M13.4662 17.931H14.3138C14.6624 17.931 14.9459 18.2145 14.9459 18.5631V19.3679C14.9459 19.7166 14.6624 20 14.3138 20H5.92278C5.57416 20 5.29071 19.7166 5.29071 19.3679V18.5631C5.29071 18.2145 5.57416 17.931 5.92278 17.931H6.77002L7.23244 16.6059C7.34692 16.2034 7.81554 15.9293 8.23968 15.8738L8.79623 15.3172C8.88899 15.2245 8.90795 15.0803 8.84278 14.9669C8.29485 14.0103 8.48313 12.7141 8.6445 12.0266C8.66726 11.9283 8.64106 11.8241 8.57692 11.7617C7.60726 10.8179 8.04416 9.27828 8.06313 9.21345L8.07899 9.17035C8.13347 9.04759 8.17037 8.90897 8.18864 8.75724C8.25692 8.19345 7.92278 7.71138 7.71761 7.47414C6.92485 6.55793 7.09312 5.00241 7.26416 4.15621C7.34313 3.76586 7.63106 3.45552 8.01588 3.34552L9.20451 3.00586C8.92106 2.69 8.73899 2.23517 8.73899 1.72414C8.73899 0.773448 9.35761 0 10.1183 0C10.879 0 11.4976 0.773448 11.4976 1.72414C11.4976 2.23517 11.3155 2.69 11.0321 3.00586L12.2211 3.34552C12.6055 3.45552 12.8935 3.76586 12.9724 4.15621C13.1435 5.00241 13.3117 6.55793 12.519 7.47414C12.3138 7.71138 11.9797 8.19345 12.048 8.75724C12.0662 8.90897 12.1031 9.04759 12.1576 9.17035L12.1731 9.21345C12.1924 9.27828 12.6293 10.8179 11.6597 11.7617C11.5955 11.8241 11.569 11.9283 11.5921 12.0266C11.7535 12.7141 11.9417 14.0103 11.3938 14.9669C11.3286 15.0803 11.3476 15.2245 11.4404 15.3172L11.9969 15.8738C12.4211 15.9297 12.8904 16.2055 13.01 16.6248L13.4662 17.931ZM8.39416 16.5517C8.18106 16.5517 7.92071 16.7041 7.88968 16.8141L7.50037 17.931H12.7362L12.3528 16.8328C12.3159 16.7041 12.0555 16.5517 11.8424 16.5517H8.39416Z" fill="#0C1932" fillOpacity="0.6"/>
									</svg>
									{movie.academyAwardWins ?? 0} Wins & {movie.academyAwardNominations ?? 0} Nominations
								</div>
								<div className="movie-list-item-details">
									<div>
										<strong>Budget</strong>
										${movie.budgetInMillions}M
									</div>
									<div>
										<strong>Revenue</strong>
										${movie.boxOfficeRevenueInMillions}M
									</div>
								</div>
							</div>
						</div>
					)
				})}				
			</section>
		</div>
	);
}

export default Movies