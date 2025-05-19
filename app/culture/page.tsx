import React from 'react'

const pillar = {
  id: 'culture',
  title: 'Culture',
  description: 'Connaissances, arts et enrichissement personnel',
  progress: 28,
  goals: [
    {
      title: 'Lire un livre par mois',
      progress: 50,
      dueDate: '31 mai'
    },
    {
      title: 'Visiter 3 expositions',
      progress: 33,
      dueDate: '31 décembre'
    }
  ]
}

export default function CulturePage() {
  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {pillar.title}
        </h2>
        <p className="text-gray-600 mb-6">{pillar.description}</p>
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-700 mb-3">
            Mon évaluation
          </h3>
          <div className="bg-gray-100 p-4 rounded-lg">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">
                Progression globale
              </span>
              <span className="text-sm font-medium text-gray-800">
                {pillar.progress}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{
                  width: `${pillar.progress}%`,
                }}
              ></div>
            </div>
          </div>
        </div>
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-medium text-gray-700">Mes objectifs</h3>
            <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
              + Ajouter un objectif
            </button>
          </div>
          <div className="space-y-3">
            {pillar.goals.map((goal, index) => (
              <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between mb-2">
                  <h4 className="font-medium text-gray-800">{goal.title}</h4>
                  <span className="text-sm text-gray-500">Échéance: {goal.dueDate}</span>
                </div>
                <div className="flex justify-between mb-1.5 text-sm">
                  <span className="text-gray-600">Progression</span>
                  <span className="font-medium">{goal.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{
                      width: `${goal.progress}%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
            Faire une nouvelle évaluation
          </button>
        </div>
      </div>
    </div>
  )
} 