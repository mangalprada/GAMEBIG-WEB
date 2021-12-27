import ReadOnlyTeamItem from '@/components/Team/ReadOnlyTeamItem';
// import { TeamType } from '@/utilities/types';
import { useEffect, useState, useCallback } from 'react';
import { fetchParticipatedTeams } from '../../../libs/getEventData';

interface Props {
  participants: any[];
}

export default function ParticipantList({ participants }: Props) {
  return (
    <div className="my-6 mx-2 rounded-md bg-gray-800 ">
      {participants.length === 0 ? (
        <span className="text-lg font-semibold text-indigo-600">
          No Teams registered yet
        </span>
      ) : (
        <div className="pb-6">
          <div className="text-center mb-2 md:mb-4">
            <span className="text-xl md:text-2xl text-center font-medium text-gray-400">
              Registered Teams
            </span>
          </div>
          <table className="table-auto border-collapse w-full text-gray-50">
            <thead className="text-center">
              <tr className="rounded-lg text-sm md:text-lg font-semibold text-indigo-500">
                <th>Serial No.</th>
                <th>Team Name</th>
                <th>Phone Number</th>
              </tr>
            </thead>
            <tbody className="text-lg font-sans text-gray-100 text-center">
              {participants.map((team, index) => {
                return (
                  <tr
                    className="bg-gray-700 table-row h-10 border-b-2 border-gray-600 rounded-md space-y-1"
                    key={index}
                  >
                    <td className="ml-6">{index + 1}</td>
                    <td className="ml-6">
                      {team.teamName?.length > 10
                        ? team.teamName.slice(0, 12) + '...'
                        : team.teamName}
                    </td>
                    <td className="ml-6">{team.phoneNumber}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
