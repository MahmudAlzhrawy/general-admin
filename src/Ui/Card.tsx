interface CardProps {
    className?: string;
    children?: React.ReactNode;
}
export default function Card({ children, className }: CardProps){
    return (
        <div className={`bg-white shadow-md rounded-lg p-6 ${className}`}>
            {children}
        </div>
    );
}