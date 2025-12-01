
"use client";

import { setTheme, setRtl, setAccent, setBoxed, setSidebarColor } from "@/redux/slices/ui.slice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

export default function ThemeSelector() {
  const dispatch = useAppDispatch();
  const ui = useAppSelector((s) => s.ui);

  return (
    <div className="p-4 space-y-3 bg-white dark:bg-gray-800 rounded shadow">
      <div>
        <label className="block mb-1">Theme</label>
        <select
          value={ui.theme}
          onChange={(e) => dispatch(setTheme(e.target.value as any))}
          className="rounded border p-2"
        >
          <option value="system">System</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>

      <div>
        <label className="inline-flex items-center gap-2">
          <input
            type="checkbox"
            checked={ui.rtl}
            onChange={(e) => dispatch(setRtl(e.target.checked))}
          />
          <span>RTL</span>
        </label>
      </div>

      <div>
        <label className="block mb-1">Accent</label>
        <input
          type="color"
          value={ui.accent}
          onChange={(e) => dispatch(setAccent(e.target.value))}
          className="w-12 h-8 p-0 border-0"
        />
      </div>

      <div>
        <label className="block mb-1">Sidebar Color</label>
        <input
          type="color"
          value={ui.sidebarColor}
          onChange={(e) => dispatch(setSidebarColor(e.target.value))}
          className="w-12 h-8 p-0 border-0"
        />
      </div>

      <div>
        <label className="inline-flex items-center gap-2">
          <input
            type="checkbox"
            checked={ui.boxed}
            onChange={(e) => dispatch(setBoxed(e.target.checked))}
          />
          <span>Boxed Layout</span>
        </label>
      </div>
    </div>
  );
}
