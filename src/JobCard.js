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
    <Card>
      <CardBody>
        <CardTitle tag="h5">{job.title}</CardTitle>
        <CardText>Salary: {job.salary}</CardText>
        <CardText>Equity: {job.equity}</CardText>
        <Button color="primary" onClick={handleApply} disabled={hasApplied}>
          {hasApplied ? 'Applied' : 'Apply'}
        </Button>
      </CardBody>
    </Card>
  );
}

export default JobCard;