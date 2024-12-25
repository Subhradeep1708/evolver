-- Table: user
CREATE TABLE user (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(25) NOT NULL,
    middle_name VARCHAR(25),
    last_name VARCHAR(25) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    role VARCHAR(10) CHECK (role IN ('controller', 'teacher', 'student')) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: teacher
CREATE TABLE teacher (
    id INT PRIMARY KEY REFERENCES user(id),
    is_controller BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: subject
CREATE TABLE subject (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT
);

-- Table: teacher_subject (Junction Table)
CREATE TABLE teacher_subject (
    teacher_id INT REFERENCES teacher(id) ON DELETE CASCADE,
    subject_id INT REFERENCES subject(id) ON DELETE CASCADE,
    PRIMARY KEY (teacher_id, subject_id)
);

-- Table: student
CREATE TABLE student (
    id INT PRIMARY KEY REFERENCES user(id),
    roll_no CHAR(15) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: exam
CREATE TABLE exam (
    id SERIAL PRIMARY KEY,
    subject_id INT REFERENCES subject(id) ON DELETE SET NULL,
    added_by INT REFERENCES teacher(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: mcq
CREATE TABLE mcq (
    id SERIAL PRIMARY KEY,
    exam_id INT REFERENCES exam(id),
    question_body TEXT NOT NULL,
    question_body_image TEXT,
    option_a TEXT NOT NULL,
    option_b TEXT NOT NULL,
    option_c TEXT NOT NULL,
    option_d TEXT NOT NULL,
    answer CHAR(1) CHECK (answer IN ('A', 'B', 'C', 'D')) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: result
CREATE TABLE result (
    id SERIAL PRIMARY KEY,
    student_id INT REFERENCES student(id),
    exam_id INT REFERENCES exam(id),
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_marks INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: answer
CREATE TABLE answer (
    id SERIAL PRIMARY KEY,
    student_id INT REFERENCES student(id),
    mcq_id INT REFERENCES mcq(id),
    selected CHAR(1) CHECK (selected IN ('A', 'B', 'C', 'D')) NOT NULL,
    is_correct BOOLEAN NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);