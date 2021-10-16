CREATE TABLE "toDoList" (
"id" SERIAL PRIMARY KEY,
"task" VARCHAR(300) NOT NULL,
"completed" BOOLEAN DEFAULT FALSE,
"deadline" VARCHAR(20),
);

INSERT INTO "toDoList" ("task", "completed", "deadline" )
VAlUES
('run 4 miles', FALSE, 'today'),
('grocery store', FALSE, 'end of week'),
('make dinner', FALSE, 'tonight'),
('do yard work', FALSE, 'end of weekend'),
('make breakfast', TRUE, 'right now');
