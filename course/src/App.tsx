 interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBasic extends CoursePartBase {
  description: string;
  kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartBackground extends CoursePartBase {
  description: string;
  backgroundMaterial: string;
  kind: "background";
}

type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground;


const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};


const Header = (props: { name: string }) => {
  return <h1>{props.name}</h1>;
};


const Part = (props: { part: CoursePart }) => {
  const { part } = props;

  switch (part.kind) {
    case "basic":
      return (
        <div>
          <p>
            {part.name} {part.exerciseCount}
          </p>
          <p>{part.description}</p>
        </div>
      );

    case "group":
      return (
        <div>
          <p>
            {part.name} {part.exerciseCount}
          </p>
          <p>Group project count: {part.groupProjectCount}</p>
        </div>
      );

    case "background":
      return (
        <div>
          <p>
            {part.name} {part.exerciseCount}
          </p>
          <p>{part.description}</p>
          <p>
            Background material: {part.backgroundMaterial}
          </p>
        </div>
      );

    default:
      return assertNever(part);
  }
};


const Total = (props: { total: number }) => {
  return <p>Number of exercises {props.total}</p>;
};


const App = () => {
  const courseName = "Half Stack application development";

  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial:
        "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    }
  ];

  const totalExercises = courseParts.reduce(
    (sum, part) => sum + part.exerciseCount,
    0
  );

  return (
    <div>
      <Header name={courseName} />

      {courseParts.map(part => (
        <Part key={part.name} part={part} />
      ))}

      <Total total={totalExercises} />
    </div>
  );
};

export default App;