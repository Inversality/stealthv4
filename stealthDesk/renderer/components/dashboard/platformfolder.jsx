'use client';
import React from 'react';
import PlatformTab from './platformtab';
import icons from '../../constants/icons';


class PlatformFolder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            isHovered: false, // Add a state to track hover
        };
    }

    toggleFolder = () => {
        this.setState((prevState) => ({
            isOpen: !prevState.isOpen,
        }));
    };

    handleMouseEnter = () => {
        this.setState({ isHovered: true });
    };

    handleMouseLeave = () => {
        this.setState({ isHovered: false });
    };

    render() {
        const { icon, label, color, tabs } = this.props;
        const { isOpen, isHovered } = this.state;

        return (
            <div className="flex flex-col mb-[13px]">
                <div
                    className="flex flex-row  hover:bg-[#3f3f46] h-[30px] rounded-[5px]"
                    onClick={this.toggleFolder}
                    onMouseEnter={this.handleMouseEnter}
                    onMouseLeave={this.handleMouseLeave}
                    style={{ cursor: 'pointer' }}
                >
                    <svg className='self-center ml-[10px] flex-shrink-0' xmlns="http://www.w3.org/2000/svg" style = {{color}} width="1em" height="1em" viewBox="0 0 512 512"><path fill="currentColor" d="M496 152a56 56 0 0 0-56-56H220.11a23.9 23.9 0 0 1-13.31-4L179 73.41A55.77 55.77 0 0 0 147.89 64H72a56 56 0 0 0-56 56v48a8 8 0 0 0 8 8h464a8 8 0 0 0 8-8ZM16 392a56 56 0 0 0 56 56h368a56 56 0 0 0 56-56V216a8 8 0 0 0-8-8H24a8 8 0 0 0-8 8Z"/></svg>
                    <h1 className="ml-[13px] text-[13px] font-medium hover:text-white self-center flex-shrink-0" style={{ color }}>
                        {label}
                    </h1>
                   
                    {/* Conditionally show the plus sign SVG based on hover state */}
                    {isHovered && (
                        <svg className="self-center h-[15px] ml-[70px] w-[15px] flex-grow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                            <path className="fill-[#545454] hover:fill-white" fill="currentColor" d="M8.5 2.75a.75.75 0 0 0-1.5 0V7H2.75a.75.75 0 0 0 0 1.5H7v4.25a.75.75 0 0 0 1.5 0V8.5h4.25a.75.75 0 0 0 0-1.5H8.5z"/>
                        </svg>
                    )}
                </div>
                {isOpen && (
                    <div className={`pl-4 mt-[21px] border-l-[1px] `}  style={{ borderLeftColor: color }} >
                    {tabs.map((tab, index) => (
                        <PlatformTab key={index} icon={tab.icon} label={tab.label} />
                    ))}
                </div>
                )}
            </div>
        );
    }
}

export default PlatformFolder;