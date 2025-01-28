import { ArrowBack, Language, Movie as MovieIcon } from '@mui/icons-material';
import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Grid,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';
import { Link as ReactRouter, useNavigate, useParams } from 'react-router-dom';

import {
  useGetFilmQuery,
  useGetSequelsAndPrequelsQuery,
  useGetStaffQuery,
} from '../../../services/kinopoiskApi';
import ErrorMessage from '../../ui/ErrorMessage';
import MovieCard from '../../ui/MovieCard/MovieCard';
import VideoPlayer from '../../ui/VideoPlayer/VideoPlayer';

export default function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const responseFilm = useGetFilmQuery(id);
  const responseSequelsAndPrequels = useGetSequelsAndPrequelsQuery(id);
  const responseStaff = useGetStaffQuery(id);

  if (
    responseFilm.isLoading ||
    responseSequelsAndPrequels.isLoading ||
    responseStaff.isLoading
  ) {
    return (
      <Box display="flex" justifyContent="center" margin="auto">
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  if (responseFilm.isError || responseStaff.isError) {
    return <ErrorMessage />;
  }
  return (
    <>
      <Grid container spacing={2} sx={{ mt: { md: 2 } }}>
        <Grid item md={4} sm={12}>
          <img
            src={responseFilm.data.posterUrl}
            alt={responseFilm.data.nameRu}
            width="100%"
          />
        </Grid>
        <Grid item md={6} sm={12}>
          <Grid container>
            <Grid item xs={2}>
              <Button
                startIcon={<ArrowBack />}
                size="large"
                onClick={() => navigate(-1)}
              />
            </Grid>
            <Grid item xs={4} alignContent="center">
              <Typography variant="h5">{responseFilm.data.nameRu}</Typography>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={6}>
              <Typography>Год</Typography>
            </Grid>
            <Grid item xs={6}>
              {' '}
              <Typography gutterBottom>{responseFilm.data.year}</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography>Страна</Typography>
            </Grid>
            <Grid item xs={6}>
              {' '}
              <Typography gutterBottom>
                {responseFilm.data.countries.map(({ country }) => (
                  <Typography key={country}>{country}</Typography>
                ))}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography>Жанры</Typography>
            </Grid>
            <Grid item xs={6}>
              {' '}
              <Typography gutterBottom>
                {responseFilm.data.genres.map(({ genre }) => (
                  <Typography key={genre}>{genre}</Typography>
                ))}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography>Режиссер</Typography>
            </Grid>
            <Grid item xs={6}>
              {' '}
              <Typography gutterBottom>
                {responseStaff.data
                  .filter(el => el.professionText === 'Режиссеры')
                  .map(({ nameRu }) => (
                    <Typography key={nameRu}>{nameRu}</Typography>
                  ))}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography>Время</Typography>
            </Grid>
            <Grid item xs={6}>
              {' '}
              <Typography gutterBottom>
                {responseFilm.data.filmLength
                  ? ((responseFilm.data.filmLength / 60) * 60 -
                      (responseFilm.data.filmLength % 60)) /
                      60 +
                    ' ч ' +
                    (responseFilm.data.filmLength % 60) +
                    ' мин'
                  : 'Информация отсутсвует'}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography gutterBottom>Описание</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>
                {responseFilm.data.description
                  ? responseFilm.data.description
                  : 'Описание отсутствует'}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={2} sm={12}>
          <Typography variant="h6" gutterBottom>
            В главных ролях
          </Typography>
          {responseStaff.data
            .filter(el => el.professionText === 'Актеры')
            .slice(0, 20)
            .map(({ nameRu, staffId }) => (
              <div key={nameRu}>
                <Link
                  component={ReactRouter}
                  to={`/actor/${staffId}`}
                  gutterBottom
                >
                  {nameRu}
                </Link>
              </div>
            ))}
        </Grid>
      </Grid>

      <Grid
        container
        spacing={2}
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Grid item xs={12}>
          <ButtonGroup variant="outlined" size="small">
            <Button
              target="_blank"
              href={responseFilm.data.webUrl}
              endIcon={<Language />}
            >
              Кинопоиск
            </Button>
            <Button
              target="_blank"
              href={`https://www.imdb.com/title/${responseFilm.data.imdbId}`}
              endIcon={<MovieIcon />}
            >
              IMDB
            </Button>
          </ButtonGroup>
        </Grid>

        <Grid item xs={12}></Grid>
        <Typography variant="h5" sx={{ mt: 2, mb: 2 }}>
          Смотреть онлайн
        </Typography>
        <VideoPlayer />
      </Grid>

      {responseSequelsAndPrequels.data && (
        <Stack alignItems="center">
          <Typography gutterBottom variant="h5" sx={{ mt: 2, mb: 2 }}>
            Приквелы и сиквелы
          </Typography>
          <Stack
            direction="row"
            flexWrap="wrap"
            justifyContent="center"
            sx={{ gap: 2 }}
          >
            {responseSequelsAndPrequels.data.map(el => (
              <MovieCard key={el.filmId} movie={el} reload />
            ))}
          </Stack>
        </Stack>
      )}
    </>
  );
}
