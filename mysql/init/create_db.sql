DROP DATABASE IF EXISTS `chatapp`;
CREATE DATABASE `chatapp` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `chatapp`;

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `user_id` INT(11) NOT NULL AUTO_INCREMENT,
  `username` TEXT NOT NULL,
  `password` TEXT,
  `create_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `messages`;
CREATE TABLE `messages` (
  `message_id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_id` INT(11) NOT NULL,
  `message` TEXT NOT NULL,
  `status` TEXT NOT NULL,
  `sender` VARCHAR(255) NOT NULL,
  `send2` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`message_id`),
  FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

/*
DROP TABLE IF EXISTS `questions`;
CREATE TABLE `questions` (
  `question_id` INT(11) NOT NULL AUTO_INCREMENT,
  `question_by` INT(11) NOT NULL,
  `content` TEXT NOT NULL,
  `status` TEXT NOT NULL,
  `question_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`question_id`),
  FOREIGN KEY (`question_by`) REFERENCES users(`user_id`)
);


DROP TABLE IF EXISTS `tags`;
CREATE TABLE `tags` (
  `tag_id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` TEXT NOT NULL,
  PRIMARY KEY (`tag_id`)
);

DROP TABLE IF EXISTS `tags_questions`;
CREATE TABLE `tags_questions` (
  `tag_question_id` INT(11) NOT NULL AUTO_INCREMENT,
  `tag_id` INT(11),
  `question_id` INT(11),
  PRIMARY KEY (`tag_question_id`),
  FOREIGN KEY (`tag_id`) REFERENCES tags(`tag_id`),
  FOREIGN KEY (`question_id`) REFERENCES questions(`question_id`)
);
*/