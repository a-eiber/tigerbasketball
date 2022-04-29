import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTeams, deleteTeam } from '../store/teamSlice';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { injectStyle } from 'react-toastify/dist/inject-style';
import { toast } from 'react-toastify';
import { FaTrash } from 'react-icons/fa';

const Standings = () => {
  const dispatch = useDispatch();

  const [toggle, setToggle] = useState(true);

  const { teams } = useSelector((state) => state.teams);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getTeams());
  }, [toggle]);

  const deleteConfirmation = async (id) => {
    const result = confirm('Are you sure you want to delete this team?');
    if (result) {
      await dispatch(deleteTeam(id));
      injectStyle();
      toast.info('Team Deleted');
      setToggle(!toggle);
    }
  };

  return (
    <div>
      <Container className="d-flex justify-content-center flex-column">
        <h1 className="text-center mt-3">Standings</h1>
        {teams.length > 0 ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Team</th>
                <th>Wins</th>
                <th>Losses</th>
                {user && user.isAdmin && <th>Admin Only</th>}
              </tr>
            </thead>
            <tbody>
              {[...teams]
                .sort((a, b) => {
                  return a.wins - b.wins;
                })
                .map((team) => {
                  return (
                    <tr key={team.id}>
                      <td>{team.name}</td>
                      <td>{team.wins}</td>
                      <td>{team.loses}</td>
                      {user && user.isAdmin && (
                        <td>
                          <Button
                            className="btn btn-danger"
                            onClick={() => deleteConfirmation(team.id)}>
                            <FaTrash />
                          </Button>
                        </td>
                      )}
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        ) : (
          <p>Loading...</p>
        )}
      </Container>
    </div>
  );
};

export default Standings;
