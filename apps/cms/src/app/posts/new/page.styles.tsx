import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  background-color: #f8fafc;
`;

export const Header = styled.div`
  background-color: #ffffff;
  border-bottom: 1px solid #e2e8f0;
  padding: 16px 24px;
`;

export const HeaderInner = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

export const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const HeaderTitles = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const FormContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 32px 24px;
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

export const MainColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const FeaturedToggle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
`;

export const ToggleText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 48px;
  height: 24px;
  cursor: pointer;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #cbd5e1;
    transition: 0.3s;
    border-radius: 24px;

    &:before {
      position: absolute;
      content: '';
      height: 18px;
      width: 18px;
      left: 3px;
      bottom: 3px;
      background-color: white;
      transition: 0.3s;
      border-radius: 50%;
    }
  }

  input:checked + span {
    background-color: #6366f1;
  }

  input:checked + span:before {
    transform: translateX(24px);
  }
`;

export const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
`;

export const FormActionsCard = styled.div`
  margin-top: 24px;
`;

export const FormActionsButtons = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

export const SvgIcon = styled.svg`
  display: block;
`;
