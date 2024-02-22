
export const Alert = ({alert}) => {
  return (
    <div className={`${alert.error? 'bg-red-800 text-white text-lg rounded-md text-center':'bg-lime-600 text-neutral-50 text-lg rounded-md h-8 text-center'}  ${alert.isVisible? 'block':'hidden'}`}>
        {alert.msg}</div>
  )
}
