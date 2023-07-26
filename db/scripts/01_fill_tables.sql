connect users

TRUNCATE TABLE users RESTART IDENTITY CASCADE;

INSERT INTO public."Users"
("UserName", "CreatedAt",  "Email",      "Enabled", "Hash",         "LastName", "Name", "Role", "Salt") VALUES
('Max',      '2023-07-14', 'iam@mail.ru', TRUE,     'AABBCCDDEEFF', 'Perchic',  'Max',  1,      'Salt');
