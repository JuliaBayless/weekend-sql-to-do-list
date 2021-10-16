CREATE TABLE "toDoList" (
"id" SERIAL PRIMARY KEY,
"task" VARCHAR(300) NOT NULL,
"completed" BOOLEAN DEFAULT FALSE,
);

INSERT INTO "toDoList" ("task", "completed")
VAlUES
('run 4 miles', FALSE),
('grocery store', FALSE),
('make dinner', FALSE),
('do yard work', FALSE),
('make breakfast', TRUE);