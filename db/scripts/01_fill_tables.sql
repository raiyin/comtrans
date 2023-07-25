connect users

TRUNCATE TABLE users RESTART IDENTITY CASCADE;

INSERT INTO users VALUES
    (1, 'Max', '2023-07-14', 'iam@mail.ru', TRUE, 'AABBCCDDEEFF', 'Perchic', 'Max', 1, 'Salt');
