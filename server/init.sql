
CREATE TABLE games (
    id VARCHAR ( 50 ) PRIMARY KEY,
    is_active BOOLEAN DEFAULT TRUE,
    game_id VARCHAR ( 50 ) NOT NULL,
    time_created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    time_updated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE characters (
    id VARCHAR ( 50 ) PRIMARY KEY,
    game_id VARCHAR ( 50 ) NOT NULL,
    name VARCHAR ( 50 ) NOT NULL,
    backstory VARCHAR ( 50 ),
    money INTEGER DEFAULT 1000,
    hp INTEGER DEFAULT 3,
    faction VARCHAR ( 50 ),
    time_created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    time_updated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE wagers (
    id VARCHAR ( 50 ) PRIMARY KEY,
    game_id VARCHAR ( 50 ) NOT NULL,
    message VARCHAR ( 255 ) ,
    char1_id VARCHAR ( 50 ) NOT NULL,
    char2_id VARCHAR ( 50 ) NOT NULL,
    amount INTEGER NOT NULL,
    accepted BOOLEAN,
    char1_declare_win BOOLEAN,
    char2_declare_win BOOLEAN,
    active BOOLEAN,
    winner VARCHAR ( 50 ),
    time_created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    time_updated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (char1_id)
        REFERENCES characters (id),
    FOREIGN KEY (char2_id)
        REFERENCES characters (id)
);

CREATE TABLE items (
    id VARCHAR ( 50 ) PRIMARY KEY,
    game_id VARCHAR ( 50 ) NOT NULL,
    item_name VARCHAR ( 255 ) NOT NULL,
    description VARCHAR ( 255 ) NOT NULL,
    uses INTEGER NOT NULL,
    owner_id VARCHAR ( 50 ) NOT NULL,
    time_created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    time_updated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (owner_id)
        REFERENCES characters (id)
);

CREATE TABLE stores (
    id VARCHAR ( 50 ) PRIMARY KEY,
    game_id VARCHAR ( 50 ) NOT NULL,
    item_name VARCHAR ( 255 ) NOT NULL,
    description VARCHAR ( 255 ) NOT NULL,
    cost INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    uses INTEGER NOT NULL,
    time_created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    time_updated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE  FUNCTION update_time_updated()
RETURNS TRIGGER AS $$
BEGIN
    NEW.time_updated = now();
    RETURN NEW;
END;
$$ language 'plpgsql';


CREATE TRIGGER update_games
    BEFORE UPDATE
    ON
        games
    FOR EACH ROW
EXECUTE PROCEDURE update_time_updated();

CREATE TRIGGER update_characters
    BEFORE UPDATE
    ON
        characters
    FOR EACH ROW
EXECUTE PROCEDURE update_time_updated();

CREATE TRIGGER update_wagers
    BEFORE UPDATE
    ON
        wagers
    FOR EACH ROW
EXECUTE PROCEDURE update_time_updated();

CREATE TRIGGER update_items
    BEFORE UPDATE
    ON
        items
    FOR EACH ROW
EXECUTE PROCEDURE update_time_updated();

CREATE TRIGGER update_stores
    BEFORE UPDATE
    ON
        stores
    FOR EACH ROW
EXECUTE PROCEDURE update_time_updated();
