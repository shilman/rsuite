import React from 'react';
import MonthDropdown from '../MonthDropdown';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { getYear } from 'date-fns';
import { CalendarProvider } from '../CalendarProvider';
import { testStandardProps } from '@test/cases';

describe('Calendar-MonthDropdown', () => {
  testStandardProps(<MonthDropdown show />);

  it('Should output year and month ', () => {
    render(
      <CalendarProvider
        value={{
          date: new Date(),
          locale: {},
          isoWeek: false,
          weekStart: 0
        }}
      >
        <MonthDropdown show />
      </CalendarProvider>
    );

    expect(screen.getAllByRole('rowheader', { hidden: true })).toHaveLength(7);
    expect(screen.getAllByRole('gridcell', { hidden: true })).toHaveLength(7 * 12);
  });

  it('Should output year and month of current year', () => {
    render(
      <CalendarProvider
        value={{
          date: new Date(),
          locale: {},
          isoWeek: false,
          weekStart: 0
        }}
      >
        <MonthDropdown show limitStartYear={1} limitEndYear={1} />
      </CalendarProvider>
    );
    const currentYear = getYear(new Date());
    expect(screen.getAllByRole('row', { hidden: true })).to.be.lengthOf(1);
    expect(screen.getAllByRole('rowheader', { hidden: true })[0].innerText).to.be.eq(
      currentYear.toString()
    );
  });

  it('Should output year and month of two previous years', () => {
    render(
      <CalendarProvider
        value={{
          date: new Date(),
          locale: {},
          isoWeek: false,
          weekStart: 0
        }}
      >
        <MonthDropdown show limitStartYear={3} limitEndYear={0} />
      </CalendarProvider>
    );
    const currentYear = getYear(new Date());
    expect(screen.getAllByRole('row', { hidden: true })).to.be.lengthOf(2);
    expect(screen.getAllByRole('rowheader', { hidden: true })[0].innerText).to.be.eq(
      (currentYear - 2).toString()
    );
    expect(screen.getAllByRole('rowheader', { hidden: true })[1].innerText).to.be.eq(
      (currentYear - 1).toString()
    );
  });

  it('Should output a range of year and month between previous and next year', () => {
    render(
      <CalendarProvider
        value={{
          date: new Date(),
          locale: {},
          isoWeek: false,
          weekStart: 0
        }}
      >
        <MonthDropdown show limitStartYear={2} limitEndYear={2} />
      </CalendarProvider>
    );
    const currentYear = getYear(new Date());
    const nextYear = currentYear + 1;
    const previousYear = currentYear - 1;
    expect(screen.getAllByRole('row', { hidden: true })).to.be.lengthOf(3);
    expect(screen.getAllByRole('rowheader', { hidden: true })[0].innerText).to.be.eq(
      previousYear.toString()
    );
    expect(screen.getAllByRole('rowheader', { hidden: true })[1].innerText).to.be.eq(
      currentYear.toString()
    );
    expect(screen.getAllByRole('rowheader', { hidden: true })[2].innerText).to.be.eq(
      nextYear.toString()
    );
  });

  it('Should call `onChangeMonth` callback ', () => {
    const onChangeMonth = vi.fn();
    render(
      <CalendarProvider
        value={{
          onChangeMonth: onChangeMonth,
          date: new Date(2025, 8, 6),
          locale: {},
          isoWeek: false,
          weekStart: 0
        }}
      >
        <MonthDropdown show />
      </CalendarProvider>
    );

    fireEvent.click(
      within(screen.getByRole('grid', { hidden: true })).queryAllByRole('gridcell', {
        hidden: true
      })[0]
    );

    expect(onChangeMonth).toHaveBeenCalledTimes(1);
    expect(onChangeMonth).toHaveBeenCalledWith({ year: 2023, month: 1 }, expect.anything());
  });

  it('Should disable month', () => {
    render(
      <CalendarProvider
        value={{ date: new Date(2019, 8, 1), locale: {}, isoWeek: false, weekStart: 0 }}
      >
        <MonthDropdown
          show
          // Disabled months > 2019-09 or < 2019-08
          // i.e. Only enable 2019-08 and 2019-09
          isMonthDisabled={({ year, month }) => {
            return year !== 2019 || month < 8 || month > 9;
          }}
        />
      </CalendarProvider>
    );

    const cells = within(screen.getByRole('row', { name: '2019', hidden: true })).getAllByRole(
      'gridcell',
      { hidden: true }
    );

    expect(cells[6]).to.have.class('disabled');
    expect(cells[7]).to.have.class('rs-calendar-month-dropdown-cell');
    expect(cells[8]).to.have.class('rs-calendar-month-dropdown-cell-active');
    expect(cells[9]).to.have.class('disabled');
  });
});
