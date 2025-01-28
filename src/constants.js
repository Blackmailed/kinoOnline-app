import {
  AutoAwesome,
  Bloodtype,
  FamilyRestroom,
  Fort,
  LiveTv,
  LocalActivity,
  LocalMovies,
  MenuBook,
  MoodBad,
  Pool,
  Reorder,
  StarPurple500,
  VolunteerActivism,
} from '@mui/icons-material';

export const iconComponents = {
  AutoAwesome,
  Bloodtype,
  FamilyRestroom,
  LiveTv,
  MenuBook,
  MoodBad,
  Pool,
  StarPurple500,
  VolunteerActivism,
  LocalMovies,
  Reorder,
  Fort,
  LocalActivity,
};

export const TOP_LISTS = [
  {
    title: 'Популярные фильмы',
    icon: 'AutoAwesome',
    url: '/popular',
    value: 'TOP_POPULAR_MOVIES',
  },
  {
    title: '250 лучших фильмов',
    icon: 'StarPurple500',
    url: '/best',
    value: 'TOP_250_MOVIES',
  },
  {
    title: '250 лучших сериалов',
    icon: 'LocalActivity',
    url: '/popular-shows',
    value: 'TOP_250_TV_SHOWS',
  },
  {
    title: 'Вампиры',
    icon: 'Bloodtype',
    url: '/vampire',
    value: 'VAMPIRE_THEME',
  },
  {
    title: 'Комиксы',
    icon: 'MenuBook',
    url: '/comics',
    value: 'COMICS_THEME',
  },
];

export const MOVIE_LISTS = [
  {
    title: 'Фильмы',
    icon: 'LocalMovies',
    url: '/films',
    value: 'FILM',
  },
  {
    title: 'Сериалы',
    icon: 'Reorder',
    url: '/serials',
    value: 'TV_SERIES',
  },
  {
    title: 'Мультфильмы',
    icon: 'Fort',
    url: '/cartoons',
    value: 'FILM',
  },
];
