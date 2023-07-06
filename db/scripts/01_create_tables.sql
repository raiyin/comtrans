-- Create table APPLICATIONS

create TABLE tbl_users
(
    id   bigint         not null unique primary key,
    name varchar unique not null
);

INSERT INTO tbl_users VALUES
    (1, 'Max');
