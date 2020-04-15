-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Apr 15, 2020 at 12:12 PM
-- Server version: 5.7.26
-- PHP Version: 7.3.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_roku_flashback`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_movie`
--

CREATE TABLE `tbl_movie` (
  `id` int(11) NOT NULL,
  `permission` varchar(2) NOT NULL,
  `name` varchar(40) NOT NULL,
  `year` varchar(9) NOT NULL,
  `genre` varchar(30) NOT NULL,
  `artist_mpaa` varchar(5) NOT NULL,
  `length` varchar(10) NOT NULL,
  `rating` varchar(5) NOT NULL,
  `des` text NOT NULL,
  `img` varchar(60) NOT NULL,
  `banner` varchar(60) NOT NULL,
  `video` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_movie`
--

INSERT INTO `tbl_movie` (`id`, `permission`, `name`, `year`, `genre`, `artist_mpaa`, `length`, `rating`, `des`, `img`, `banner`, `video`) VALUES
(1, '2', 'Sunset Boulevard', '1950', 'Drama | Film-Noir', 'PG', '110', '4/5', 'An aging silent film queen refuses to accept that her stardom has ended. She hires a young screenwriter to help set up her movie comeback. The screenwriter believes he can manipulate her, but he soon finds out he is wrong. The screenwriters ambivalence about their relationship and her unwillingness to let go leads to a situation of violence, madness, and death.', 'sunset_boulevard.png', 'sunset_bou_banner.png', 'Sunset_boulevard_trailer.mp4'),
(2, '2', 'E.T.', '1982', 'Family | Sci-Fi', 'PG-13', '121', '3/5', 'After a gentle alien becomes stranded on Earth, the being is discovered and befriended by a young boy named Elliott (Henry Thomas). Bringing the extraterrestrial into his suburban California house, Elliott introduces E.T., as the alien is dubbed, to his brother and his little sister, Gertie (Drew Barrymore), and the children decide to keep its existence a secret. Soon, however, E.T. falls ill, resulting in government intervention and a dire situation for both Elliott and the alien.', 'et.png', 'et_banner.png', 'E.T..mp4'),
(3, '2', 'Edward Ssissorhands', '1990', 'Drama | Sci-Fi', 'PG-13', '106', '2/5', 'In a castle high on top of a hill lives an inventor\'s greatest creation - Edward, a near-complete person. The creator died before he could finish Edward\'s hands; instead, he is left with metal scissors for hands. Since then, he has lived alone, until a kind lady called Peg discovers him and welcomes him into her home. At first, everyone welcomes him into the community, but soon things begin to take a change for the worse.', 'edward.png', 'edward_banner.png', 'pingu.mp4'),
(4, '1', 'Cinderella', '1950', 'Fantasy | Romance', 'G', '76', '4/5', 'Cinderella, the beautiful and kind-hearted daughter, sees her world turn upside down when her beloved mother dies, and her pained father remarries another woman, the wicked Lady Tremaine, who has two equally cruel daughters, the jealous Anastasia and Drizella. But, once more, things will go from bad to worse, When Cinderella\'s father, too, dies, leaving her all alone in the Lady\'s clutches to serve as her maid-of-all-work. Under those circumstances, a shabby and neglected Cinderella doesn\'t stand much of a chance of attending the King\'s royal ball--let alone, captivate the handsome Prince--unless she turns to her loving Fairy Godmother who has quite a few tricks up her sleeve. Nevertheless, will the wronged damsel ever find peace--and with it--her own Prince Charming?', 'cindrella.png', 'cinderella_banner.png', 'cinderella.mp4'),
(5, '1', 'Willy Wonka The Chocolate Factory', '1971', 'Family | Fantasy', 'G', '89', '3.5/5', 'The world is astounded when Willy Wonka, for years a recluse in his factory, announces that five lucky people will be given a tour of the factory, shown all the secrets of his amazing candy, and one will win a lifetime supply of Wonka chocolate. Nobody wants the prize more than young Charlie, but as his family is so poor that buying even one bar of chocolate is a treat, buying enough bars to find one of the five golden tickets is unlikely in the extreme. But in movieland, magic can happen. Charlie, along with four somewhat odious other children, get the chance of a lifetime and a tour of the factory. Along the way, mild disasters befall each of the odious children, but can Charlie beat the odds and grab the brass ring?', 'willy_wonka.png', 'willy_wonka_banner.png', 'willy_wonka_the_chocolate_factory.mp4'),
(6, '1', 'Toy Story', '1995', 'Adventure | Comedy', 'G', '81', '5/5', 'Woody, a good-hearted cowboy doll who belongs to a young boy named Andy, sees his position as Andy\'s favorite toy jeopardized when his mom buys him a Buzz Lightyear action figure. Even worse, the arrogant Buzz thinks he\'s a real spaceman on a mission to return to his home planet. When Andy\'s family moves to a new house, Woody and Buzz must escape the clutches of maladjusted neighbor Sid Phillips and reunite with their boy.', 'toy_story.png', 'toy_story_banner.png', 'toy_story.mp4');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_music`
--

CREATE TABLE `tbl_music` (
  `id` int(11) NOT NULL,
  `permission` varchar(2) NOT NULL,
  `name` varchar(50) NOT NULL,
  `year` varchar(9) NOT NULL,
  `genre` varchar(30) NOT NULL,
  `artist_mpaa` varchar(30) NOT NULL,
  `length` varchar(10) NOT NULL,
  `rating` varchar(5) NOT NULL,
  `des` text NOT NULL,
  `img` varchar(60) NOT NULL,
  `banner` varchar(60) NOT NULL,
  `video` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_music`
--

INSERT INTO `tbl_music` (`id`, `permission`, `name`, `year`, `genre`, `artist_mpaa`, `length`, `rating`, `des`, `img`, `banner`, `video`) VALUES
(1, '2', 'Put Your Head On My Shoulder', '1959', 'Vocal | Easy Listening', 'Paul Anka', '02:37', '4/5', 'Anka was far and away the most successful teenage singer of the \'50s who wrote his own songs. By the time he wrote \"Put Your Head On My Shoulder,\" he had been a star for two years, having hit #1 with \"Diana\" in 1957. He had been to plenty of dance parties, just more often as a performer than a participant. Said Anka: \"When I was playing record hops, I noticed that everybody\'s head was on somebody else\'s shoulder. I had never heard a song that expressed that feeling, so one night I went back to my hotel room and wrote \'Put Your Head On My Shoulder.\'\"', 'paul_anka.png', 'paul_anka_banner.jpg', 'put_your_head_on_my_shoulder.mp4'),
(2, '2', 'Hey Jude', '1968', 'Country', 'The Beatles', '03:37', '4.5/5', '\"Hey Jude,\" one of the Beatles\' most famous songs, is an uplifting ballad that\'s inspired the masses for decades. The song, written by Paul McCartney and also credited to John Lennon for some contributions, has been long-used as a generally encouraging message, and it was specifically inspired as an empathetic message to Lennon\'s son during a tough time for him.', 'the_beatles.png', 'hey_jude_banner.png', 'hey_jude.mp4'),
(3, '2', 'I Want It That Way', '1999', 'Pop', 'Backstreet Boys', '03:39', '3/5', 'The band did not think this should be the first single because it sounded too much like their last album. Their record company convinced them otherwise. The result was the biggest selling Backstreet record in UK (and their only #1 hit there). The song also peaked at #6 in the US.', 'bsb.png', 'bsb_banner.png', 'i_want_it_that_way.mp4'),
(4, '1', 'Supercalifragilisticexpialidocious', '1964', 'Soundtrack', 'Julie Andrews, Dick Van Dyke', '03:03', '4.5/5', 'This was written by Robert and Richard Sherman, brothers who have written songs like \"It\'s A Small World\" and \"Chitty Chitty Bang Bang.\" They got the title when one of the brothers learned the word at summer camp in the Adirondack Mountains - it was a word only kids knew the meaning of and adults did not.', 'supercal.png', 'supercal_banner.png', 'supercalifragilisticexpialidocious.mp4'),
(5, '1', 'Somewhere Out There', '1986', 'Soundtrack', 'Linda Ronstadt, James Ingram', '02:13', '3/5', 'This popular duet was written for the Steven Spielberg-produced animated film An American Tail. In the movie, a family of mice from the Ukraine immigrates to the United States, but loses young Fievel along the way. One lonely night, Fievel (Phillip Glasser) and his sister Tanya (Betsy Cathcart), separated by a long distance, sing \"Somewhere Out There\" in the hopes of reuniting. Linda Ronstadt and James Ingram were enlisted to sing the pop version, a romantic ballad about two separated lovers who take comfort in the fact they are looking out at the same starry sky.', 'somewhere_out_there.png', 'somewhere_out_there_banner.png', 'somewhere_out_there.mp4'),
(6, '1', 'Barbie Girl', '1997', 'Pop', 'Aqua', '03:22', '3.5/5', 'Aqua are a group of Scandinavian musicians and DJs who had originally formed under the name Joyspeed. This yielded some small chart success in their native region, but the group grew disillusioned and started over as Aqua.', 'barbie_girl.png', 'barbie_girl_banner.png', 'barbie_girl.mp4');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_tvshow`
--

CREATE TABLE `tbl_tvshow` (
  `id` int(11) NOT NULL,
  `permission` varchar(2) NOT NULL,
  `name` varchar(40) NOT NULL,
  `year` varchar(9) NOT NULL,
  `genre` varchar(30) NOT NULL,
  `artist_mpaa` varchar(5) NOT NULL,
  `length` varchar(10) NOT NULL,
  `rating` varchar(5) NOT NULL,
  `des` text NOT NULL,
  `img` varchar(60) NOT NULL,
  `banner` varchar(60) NOT NULL,
  `video` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_tvshow`
--

INSERT INTO `tbl_tvshow` (`id`, `permission`, `name`, `year`, `genre`, `artist_mpaa`, `length`, `rating`, `des`, `img`, `banner`, `video`) VALUES
(1, '2', 'Friends', '1994-2004', 'Comedy | Drama', 'TV-14', '10', '5/5', 'A show about six friends in New York as they navigate their way through life and learn to grow up as they approach the third decade of their life. All, with the help from each other to get them through the obstacles that life naturally has for us.', 'friends.png', 'friends_banner.png', 'FRIENDS.mp4'),
(2, '2', 'M*A*S*H', '1972-1983', 'Comedy | Drama', 'TV-PG', '11', '2.5/5', 'Irreverent black comedy following the exploits of a host of offbeat characters at a medical unit during the Korean war, including surgeons Hawkeye Pierce and Trapper John McIntyre who create havoc with their martini parties and practical jokes while the war rages around them. The film spawned a successful television series and won an Oscar for best screenplay.', 'mash.png', 'mash_banner.png', 'M*A*S*H.mp4'),
(3, '2', 'Star Trek', '1966-1969', 'Action | Sci-Fi', 'TV-PG', '3', '2.5/5', 'The original Star Trek series focuses on the 23rd century adventures of Captain James T. Kirk and the U.S.S. Enterprise (NCC-1701), a powerful interstellar spacecraft dispatched by Earth-based Starfleet Command to explore the galaxy.  Kirk commands a crew of 430 men and women aboard his starship, which can travel at speeds surpassing the speed of light.  Kirk’s five-year mission—and his mandate from Starfleet—is to seek out new life and new civilizations, and to boldly go where no man has gone before.', 'start_trek.png', 'start_trek_banner.png', 'star-trek-into-darkness-original-series-trailer.mp4'),
(4, '1', 'Sesame Street', '1969', 'Adventure | Comedy', 'TV-G', '47', '4/5', 'Sesame Street is an American educational children\'s television series that combines live action, sketch comedy, animation and puppetry. ... With the creation of Sesame Street, producers and writers of a children\'s television show used, for the first time, educational goals and a curriculum to shape its content.', 'sesame_street.png', 'sesame_street_banner.png', 'sesame_street.mp4'),
(5, '1', 'Pingu', '1986', 'Short | Comedy', 'TV-G', '6', '5/5', 'Pingu is the main character of the series, a typically playful, sometimes naughty, curious little boy penguin. His name comes from the German word for penguin, Pinguin. He is strong-willed and mostly well-behaved but prone to making mischief and throwing occasional tantrums.', 'pingu.png', 'pingu_banner.png', 'pingu.mp4'),
(6, '1', 'Barney and Friends', '1992', 'Comedy', 'TV-G', '14', '3/5', 'Get ready to laugh and learn as Barney and his friends take a tee-riffic trip and learn about four-wheeled ways to get around! From fire trucks to dump trucks to bumping up and down in a little red wagon, you can travel anywhere and build anything when you use your imagination.', 'barney_friends.png', 'barney_banner.png', 'pingu.mp4');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_user`
--

CREATE TABLE `tbl_user` (
  `user_id` int(11) NOT NULL,
  `user_fname` varchar(60) NOT NULL,
  `user_lname` varchar(50) NOT NULL,
  `user_pass` varchar(60) NOT NULL,
  `user_email` varchar(150) NOT NULL,
  `user_avatar` varchar(60) NOT NULL,
  `user_admin` varchar(1) NOT NULL,
  `user_permission` varchar(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_user`
--

INSERT INTO `tbl_user` (`user_id`, `user_fname`, `user_lname`, `user_pass`, `user_email`, `user_avatar`, `user_admin`, `user_permission`) VALUES
(1, 'Simon', 'Bobby', '1234', 'SimonIsCute1234@gmail.com', 'simon.svg', '1', '2'),
(2, 'Emma', 'Watson', '1234', 'SimonIsCute1234@gmail.com', 'emma.svg', '1', '2'),
(3, 'Sofie', 'Yonge', '1234', 'SimonIsCute1234@gmail.com', 'sofie.svg', '0', '2'),
(4, 'Robbie', 'Bobby', '1234', 'SimonIsCute1234@gmail.com', 'robbie.svg', '0', '1'),
(5, 'George', 'Bobby', '1234', 'SimonIsCute1234@gmail.com', 'george.svg', '0', '1'),
(6, 'Amy', 'Bobby', '1234', 'SimonIsCute1234@gmail.com', 'amy.svg', '0', '1');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_movie`
--
ALTER TABLE `tbl_movie`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_music`
--
ALTER TABLE `tbl_music`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_tvshow`
--
ALTER TABLE `tbl_tvshow`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_user`
--
ALTER TABLE `tbl_user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_movie`
--
ALTER TABLE `tbl_movie`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tbl_music`
--
ALTER TABLE `tbl_music`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tbl_tvshow`
--
ALTER TABLE `tbl_tvshow`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tbl_user`
--
ALTER TABLE `tbl_user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
