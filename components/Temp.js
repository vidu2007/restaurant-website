// components/InteractiveCV.js
export default function InteractiveCV() {
  return (
    <div className="min-h-screen bg-white p-6 flex justify-center">
      <div className="w-full max-w-4xl">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-black">
            Gammanage Vathila Vidusahan Perera
          </h1>
          <p className="text-lg text-neutral-700">
            Junior / Intern Software Developer
          </p>
        </div>

        {/* Contact & Academics */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          
          <div className="border border-neutral-300 p-4 rounded-lg">
            <h2 className="font-semibold text-black mb-2">Contact</h2>
            <p className="text-sm text-black">📞 0713418092</p>
            <p className="text-sm text-black">📧 vathilavidu@gmail.com</p>
            <p className="text-sm text-black">🏠 111/3/F, Ranala Road, Habarakada, Homagama</p>
            <p className="text-sm text-black">🎂 28/01/2007</p>
          </div>

          <div className="border border-neutral-300 p-4 rounded-lg">
            <h2 className="font-semibold text-black mb-2">Academics</h2>
            <p className="text-sm text-black">G.C.E. O/L – 8A 1C (2022/2023)</p>
            <p className="text-sm text-black">G.C.E. A/L – Physical Science (2025) – Pending</p>
          </div>

          <div className="border border-neutral-300 p-4 rounded-lg">
            <h2 className="font-semibold text-black mb-2">Language Skills</h2>
            <p className="text-sm text-black">Gateway Test of English – Merit (Intermediate)</p>
          </div>
        </div>

        {/* Technical Skills */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-black mb-4">
            Technical Skills
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "ExpressJS",
              "NextJS",
              "Redux",
              "React Native",
              "ElectronJS",
              "MongoDB",
              "Postman",
              "Unity (Game Engine)"
            ].map(skill => (
              <div 
                key={skill} 
                className="border border-neutral-300 p-3 rounded-lg text-black text-sm hover:bg-neutral-100 transition"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>

        {/* Schools */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-black mb-3">Schools</h2>
          <ul className="list-disc ml-6 text-sm text-neutral-800 space-y-1">
            <li>Thurstan College, Colombo 07</li>
            <li>President’s College, Kotte</li>
          </ul>
        </div>

        {/* Extracurricular */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-black mb-3">
            Extracurricular Activities
          </h2>
          <ul className="list-disc ml-6 text-sm text-neutral-800 space-y-2">
            <li>President of the English Literary Association (2022/2023)</li>
            <li>
              Merit Award & Special Appreciation – CubeHack 2021  
              (Cube satellite design competition; only school team, led by you)
            </li>
            <li>Community Service Director – Interact Club</li>
            <li>Scout at President’s College Kotte</li>
            <li>Played Basketball, Cricket, Swimming</li>
          </ul>
        </div>

      </div>
    </div>
  );
}
