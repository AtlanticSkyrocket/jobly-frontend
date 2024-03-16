import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import { useUserContext } from './UserContext';

function JobCard({ job }) {
  const { applications, applyToJob } = useUserContext();
  const [hasApplied, setHasApplied] = useState(applications.includes(job.id));

  const handleApply = async () => {
    const success = await applyToJob(job.id);
    setHasApplied(success);
  };

  useEffect(() => {
    setHasApplied(applications.includes(job.id));
  }, [applications, job.id]);

  return (
    <Card className='mb-3' key={job.id}>
      <CardBody>
        <CardTitle tag="h6">{job.title}</CardTitle>
        <CardText>Salary: {job.salary}</CardText>
        <CardText>Equity: {job.equity}</CardText>
        <div className="d-flex justify-content-end">
          <Button color="danger" onClick={handleApply} disabled={hasApplied}>
            {hasApplied ? 'Applied' : 'Apply'}
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}

export default JobCard;