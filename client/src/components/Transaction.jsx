import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import formatDateTime from "../utils/formatDateTime";

function Transaction({ txn, index }) {
    const ref = useRef(null);
    const inView = useInView(ref, { triggerOnce: true });

    return (
        <motion.div
            ref={ref}
            className="transaction"
            initial={{ opacity: 0, x: 100 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
        >
            <strong>Transaction ID:</strong> {txn.tid} <br />
            Transaction of
            <strong> Amount:</strong> ₹{txn.amount} on <b>{formatDateTime(txn.timestamp)}</b> <br />
            <ul>
                <li>
                    <strong>From:</strong> {txn.frid}
                </li>
                <li>
                    <strong>To:</strong> {txn.toid}
                </li>
            </ul>
        </motion.div>
    );
}

export default Transaction;
