 interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartDescription {
  kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartBackground extends CoursePartDescription {
  backgroundMaterial: string;
  kind: "background";
}

interface CoursePartSpecial extends CoursePartDescription {
  requirements: string[];
  kind: "special";
}

type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartSpecial;

const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is an awesome course part",
    kind: "basic",
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3,
    kind: "group",
  },
  {
    name: "Basics of type Narrowing",
    exerciseCount: 7,
    description: "How to go from unknown to string",
    kind: "basic",
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    backgroundMaterial:
      "https://type-level-typescript.com/template-literal-types",
    kind: "background",
  },
  {
    name: "TypeScript in frontend",
    exerciseCount: 10,
    description: "a hard part",
    kind: "basic",
  },
  {
    name: "Backend development",
    exerciseCount: 21,
    description: "Typing the backend",
    requirements: ["nodejs", "jest"],
    kind: "special",
  },
];

const assertNever = (value: never): never => {
  throw new Error(`Unhandled course part: ${JSON.stringify(value)}`);
};

const Part = ({ coursePart }: { coursePart: CoursePart }) => {
  switch (coursePart.kind) {
    case "basic":
      return (
        <div>
          <h3>{coursePart.name}</h3>
          <p>Exercise count: {coursePart.exerciseCount}</p>
          <p>Description: {coursePart.description}</p>
        </div>
      );

    case "group":
      return (
        <div>
          <h3>{coursePart.name}</h3>
          <p>Exercise count: {coursePart.exerciseCount}</p>
          <p>Group project count: {coursePart.groupProjectCount}</p>
        </div>
      );

    case "background":
      return (
        <div>
          <h3>{coursePart.name}</h3>
          <p>Exercise count: {coursePart.exerciseCount}</p>
          <p>Description: {coursePart.description}</p>
          <p>
            Background material:{" "}
            <a href={coursePart.backgroundMaterial}>
              {coursePart.backgroundMaterial}
            </a>
          </p>
        </div>
      );

    case "special":
      return (
        <div>
          <h3>{coursePart.name}</h3>
          <p>Exercise count: {coursePart.exerciseCount}</p>
          <p>Description: {coursePart.description}</p>
          <p>Requirements:</p>
          <ul>
            {coursePart.requirements.map((requirement) => (
              <li key={requirement}>{requirement}</li>
            ))}
          </ul>
        </div>
      );

    default:
      return assertNever(coursePart);
  }
};

const Content = () => {
  return (
    <div>
      {courseParts.map((coursePart) => (
        <Part key={coursePart.name} coursePart={coursePart} />
      ))}
    </div>
  );
};

const App = () => {
  return (
    <div>
      <h1>Half Stack application development</h1>
      <Content />
    </div>
  );
};

export default App;