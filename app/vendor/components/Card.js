import Image from 'next/image';

const Card = ({ title, value, percentage, imageSrc}) => {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md">
        <div className="flex justify-between">
          <div>
            <h3 className="text-gray-600">{title}</h3>  
            <p className="text-xl font-bold">{value}</p>
          </div>
          <div className="text-green-500">{percentage}</div>
        </div>
        {imageSrc && (
        <div className="mt-4">
          <Image
            src={imageSrc}
            alt={title}
            width={300} 
            height={300} 
            className="rounded"
          />
        </div>
      )}
      </div>
    );
  };
  
  export default Card;
  