import React from 'react';
import { X } from 'lucide-react';

interface IngredientsListProps {
  onClose: () => void;
}

const IngredientsList: React.FC<IngredientsListProps> = ({ onClose }) => {
  const ingredients = [
    {
      name: "Peptídeos Bioativos de Colágeno",
      amount: "2,5g",
      vd: "**",
      description: "Promove firmeza e elasticidade da pele, fortalece cabelos e unhas, e apoia a saúde das articulações."
    },
    {
      name: "Silício Orgânico",
      amount: "5mg",
      vd: "**",
      description: "Mineral essencial para a formação e manutenção do tecido conjuntivo, fortalecendo pele, cabelos e unhas."
    },
    {
      name: "Metilsulfonilmetano (MSM)",
      amount: "42mg",
      vd: "**",
      description: "Composto orgânico de enxofre que ajuda na formação de colágeno e promove a saúde das articulações."
    },
    {
      name: "Inositol",
      amount: "60mg",
      vd: "**",
      description: "Auxilia no metabolismo celular e na função do sistema nervoso, ajudando a combater o estresse."
    },
    {
      name: "Glutamina",
      amount: "310mg",
      vd: "**",
      description: "Aminoácido que fortalece o sistema imunológico e melhora a absorção de nutrientes."
    },
    {
      name: "L-Leucina",
      amount: "410mg",
      vd: "**",
      description: "Aminoácido essencial que estimula a síntese proteica e fornece energia."
    },
    {
      name: "L-Isoleucina",
      amount: "250mg",
      vd: "**",
      description: "Aminoácido essencial que trabalha em conjunto com L-Leucina para promover equilíbrio energético."
    },
    {
      name: "L-Valina",
      amount: "275mg",
      vd: "**",
      description: "Aminoácido essencial que ajuda na recuperação muscular e energia sustentada."
    },
    {
      name: "Citrulina-Arginina",
      amount: "5mg",
      vd: "**",
      description: "Combinação que ajuda a melhorar a circulação sanguínea e o desempenho físico."
    },
    {
      name: "Vitamina A",
      amount: "1000mcg",
      vd: "125%",
      description: "Essencial para visão saudável, sistema imunológico e saúde da pele."
    },
    {
      name: "Tiamina (Vitamina B1)",
      amount: "1,2mg",
      vd: "100%",
      description: "Importante para o metabolismo energético e função nervosa."
    },
    {
      name: "Riboflavina (Vitamina B2)",
      amount: "2,02mg",
      vd: "168%",
      description: "Ajuda a converter nutrientes em energia e apoia a saúde ocular."
    },
    {
      name: "Niacina (Vitamina B3)",
      amount: "15mg",
      vd: "100%",
      description: "Promove a saúde cardiovascular e o metabolismo energético."
    },
    {
      name: "Ácido Pantotênico (Vitamina B5)",
      amount: "5mg",
      vd: "100%",
      description: "Essencial para a síntese de hormônios e para o metabolismo."
    },
    {
      name: "Piridoxina (Vitamina B6)",
      amount: "10mg",
      vd: "769%",
      description: "Vital para a função cerebral e para a síntese de neurotransmissores."
    },
    {
      name: "Vitamina B12",
      amount: "4,8mcg",
      vd: "200%",
      description: "Importante para a formação de células vermelhas e função neurológica."
    },
    {
      name: "Vitamina C",
      amount: "100mg",
      vd: "100%",
      description: "Antioxidante potente que reforça a imunidade e produção de colágeno."
    },
    {
      name: "Vitamina D",
      amount: "50mcg",
      vd: "100%",
      description: "Essencial para absorção de cálcio e saúde óssea."
    },
    {
      name: "Vitamina E",
      amount: "30mg",
      vd: "200%",
      description: "Poderoso antioxidante que protege as células contra danos."
    },
    {
      name: "Biotina",
      amount: "45mcg",
      vd: "150%",
      description: "Vitamina fundamental para a saúde dos cabelos, pele e unhas."
    },
    {
      name: "Ácido Fólico",
      amount: "300mcg",
      vd: "100%",
      description: "Importante para a síntese de DNA e formação de células vermelhas."
    },
    {
      name: "Colina",
      amount: "87,5mg",
      vd: "15%",
      description: "Apoia a função hepática e o desenvolvimento cerebral."
    },
    {
      name: "Cromo",
      amount: "250mcg",
      vd: "333%",
      description: "Mineral que ajuda no metabolismo da glicose."
    },
    {
      name: "Selênio",
      amount: "100mcg",
      vd: "166%",
      description: "Mineral com potente ação antioxidante que fortalece a imunidade."
    },
    {
      name: "Zinco",
      amount: "11mg",
      vd: "100%",
      description: "Mineral essencial para função imunológica e cicatrização."
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-scaleIn">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6 sticky top-0 bg-white z-10 py-2">
            <h3 className="text-2xl font-bold text-juvelina-gold">Composição Completa da Juvelina</h3>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>
          
          <p className="text-gray-700 mb-6">
            Nossa fórmula única foi desenvolvida com 25 nutrientes premium cuidadosamente selecionados para trabalhar em sinergia, 
            oferecendo benefícios para energia, imunidade, pele, cabelos e unhas.
          </p>
          
          <div className="border-b border-gray-200 mb-6 pb-2">
            <div className="grid grid-cols-12 font-bold text-gray-700">
              <div className="col-span-4 sm:col-span-5">Ingrediente</div>
              <div className="col-span-3 sm:col-span-2 text-center">Quantidade</div>
              <div className="col-span-2 text-center">%VD*</div>
              <div className="col-span-3 hidden sm:block">Benefício Principal</div>
            </div>
          </div>
          
                    <div className="space-y-4">
            {ingredients.map((ingredient, index) => (
              <div key={index} className={`grid grid-cols-12 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} p-2 rounded-lg`}>
                <div className="col-span-4 sm:col-span-5 font-medium text-gray-800">
                  {ingredient.name === "Metilsulfonilmetano (MSM)" ? (
                    <>
                      <span>Metilsulfonil-</span><br/>
                      <span>metano (MSM)</span>
                    </>
                  ) : (
                    ingredient.name
                  )}
                </div>
                <div className="col-span-3 sm:col-span-2 text-center">{ingredient.amount}</div>
                <div className="col-span-2 text-center">{ingredient.vd}</div>
                <div className="col-span-12 sm:col-span-3 text-gray-600 text-sm mt-1 sm:mt-0">{ingredient.description}</div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-sm text-gray-500">
            <p>* %VD = Percentual de Valores Diários com base em uma dieta de 2.000 kcal ou 8.400 kJ.</p>
            <p>** Valor Diário não estabelecido.</p>
          </div>
          
          <div className="mt-8 text-center">
            <button 
              onClick={onClose}
              className="bg-juvelina-gold text-white px-6 py-2 rounded-full hover:bg-opacity-90 transition"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IngredientsList;