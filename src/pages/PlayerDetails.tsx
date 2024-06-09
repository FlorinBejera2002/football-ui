
export   PlayerDetails=()=> {
  return (
    <>
      {playerDetails && playerDetails.id === player.id && (
                  <tr>
                    <td className="px-6 py-4" colSpan={3}>
                      <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
                        <div className="grid grid-cols-2 gap-4">
                          {Object.entries(player).map(([key, value]) => (
                            <div className="text-black" key={key}>
                              <strong>{key}:</strong> {value}
                            </div>
                          ))}
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
    </>
  )
}
